import { UsuarioVaku } from "@/models/usuario/Usuario";
import { getLogoEmpresa } from "@/services/database/empresaServices";
import {
  getUsuario,
  getUsuarioByUid,
  getUsuarioV1,
} from "@/services/database/usuariosServices";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/config/";

// Define el tipo para el contexto de autenticación
interface AuthContextType {
  currentUser: UsuarioVaku | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  logoEmpresa: string | null;
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

  useEffect(() => {
    // Observador de estado de autenticación de Firebase
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userSemiComplete = await getUsuarioByUid(user?.uid);
        const empresa = await getLogoEmpresa(userSemiComplete.empresaId);
        setLogoEmpresa(empresa);
        const { divisionId, empresaId, gerenciaId, id } = userSemiComplete;
        let userComplete;
        if (typeof divisionId === "undefined") {
          userComplete = await getUsuarioV1(id, empresaId);
        } else {
          userComplete = await getUsuario(
            user?.uid,
            empresaId,
            gerenciaId,
            divisionId
          );
        }
        // El usuario está autenticado
        setUser(userComplete);
      } else {
        // El usuario no está autenticado
        setUser(null);
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
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const authContextValue: AuthContextType = {
    currentUser,
    signIn,
    signOut,
    logoEmpresa,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
