import Loading from "@/components/Loading";
import { Empresa } from "@/models/empresa/Empresa";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/config/";


// Define el tipo para el contexto de autenticación
interface AuthContextType {
  currentUser: UsuarioVaku | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  logoEmpresa: string | null;
  loading: boolean;
  userLogger: boolean;
}

// Crea el contexto de autenticación
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setUser] = useState<UsuarioVaku | null>(null);
  const [logoEmpresa, setLogoEmpresa] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLogger, setUserLogger] = useState<boolean>(false);

  const usuarioRepository = new FirestoreRepository<UsuarioVaku>("auth");
  const empresaRepository = new FirestoreRepository<Empresa>("empresas");

  useEffect(() => {
    // Observador de estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(
          "🚀 ~ file: AuthContextFb.tsx:39 ~ unsubscribe ~ user:",
          user.uid
        );
        setLoading(true);
        const userSemiComplete = await usuarioRepository.get(user?.uid);
        const empresa = await empresaRepository.get(
          userSemiComplete?.empresaId
        );
        console.log(
          "🚀 ~ file: AuthContextFb.tsx:50 ~ unsubscribe ~ empresa:",
          empresa.url
        );
        console.log("Usuario semi-completo:", userSemiComplete);
        console.log("Empresa:", empresa);

        setTimeout(() => {
          setUser(userSemiComplete);
          setLogoEmpresa(empresa.url);
          setUserLogger(true);
          setLoading(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setUserLogger(false);
          setUser(null);
          setLoading(false);
        }, 1500);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setTimeout(() => {
        setLoading(false);
      }, 5000);

      setUser(null);
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
    logoEmpresa,
    loading,
    userLogger,
  };
  console.log("🚀 ~ file: AuthContextFb.tsx:88 ~ loading:", loading);

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
