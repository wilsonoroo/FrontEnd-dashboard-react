import Loading from "@/components/Loading";
import { Empresa } from "@/models/empresa/Empresa";
import { UsuarioVaku } from "@/models/usuario/Usuario";
import { FirestoreRepository } from "@/repositories/FirestoreRepository";
import { getLogoEmpresa } from "@/services/database/empresaServices";
import {
  getUsuarioByUid,
  getUsuarioV1,
} from "@/services/database/usuariosServices";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/config/";

// Define el tipo para el contexto de autenticación
interface AuthContextType {
  currentUser: UsuarioVaku | null;
  currentUserAll: UsuarioVaku | null;
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
  const [currentUserAll, setUserAll] = useState<UsuarioVaku | null>(null);
  const [logoEmpresa, setLogoEmpresa] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userLogger, setUserLogger] = useState<boolean>(false);

  const usuarioRepository = new FirestoreRepository<UsuarioVaku>("auth");
  const empresaRepository = new FirestoreRepository<Empresa>("empresas");

  useEffect(() => {}, [currentUserAll]);

  useEffect(() => {
    // Observador de estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        let userSemiComplete: any;
        let userComplete: any;
        if (import.meta.env.VITE_FIREBASE_DATABASE_URL) {
          userSemiComplete = await getUsuarioByUid(user?.uid);
          let isUserDT = userSemiComplete.isUserDt;

          const empresa = await getLogoEmpresa(
            userSemiComplete.empresaId,
            isUserDT
          );

          const { divisionId, empresaId, gerenciaId, id, empresaIdGlobal } =
            userSemiComplete;
          let userComplete = await getUsuarioV1(id, empresaId);
          if (!isUserDT) {
            userComplete = await getUsuarioV1(id, empresaId);
            userComplete.empresaIdGlobal = empresaIdGlobal;
          }

          setLogoEmpresa(empresa);
          setUserAll(userComplete);
          setUser(userComplete);
          setTimeout(() => {
            setLoading(false);
          }, 15000);
        } else {
          userSemiComplete = await usuarioRepository.get(user?.uid);
          userComplete = await getUsuarioV1(
            user?.uid,
            userSemiComplete?.empresaId
          );

          const empresa = await empresaRepository.get(
            userSemiComplete?.empresaId
          );
        }

        setTimeout(() => {
          setUser(userSemiComplete);
          // setUserAll(userComplete);
          // setLogoEmpresa(empresa.url);
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
      console.error("Error al iniciar sesión:", error);
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
      console.error("Error al cerrar sesión:", error);
    }
  };

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
    currentUserAll,
    logoEmpresa,
    loading,
    userLogger,
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
