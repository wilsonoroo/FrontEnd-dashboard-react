import { createContext, ReactNode, useEffect, useState } from "react";

import Loading from "@components/Loading";
import { UsuarioVaku } from "@model/user";
import { auth } from "@services/config";
import { getActive, getUtils } from "@services/database/empresaServices";
import {
  getUsuario,
  getUsuarioByUid,
} from "@services/database/usuariosServices";
import React from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

interface ContextValue {
  currentUser: UsuarioVaku | null;
  utils: any;
  config: any;
}

export const AuthContext = createContext<ContextValue>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [config, setConfig] = useState(null);
  const [utils, setUtils] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null) {
        const userSemiComplete = await getUsuarioByUid(user?.uid);
        console.log(
          "🚀 ~ file: AuthContext.tsx:35 ~ auth.onAuthStateChanged ~ userSemiComplete:",
          userSemiComplete
        );

        const { divisionId, empresaId, gerenciaId } = userSemiComplete;

        const userComplete = await getUsuario(
          user?.uid,
          empresaId,
          gerenciaId,
          divisionId
        );

        setCurrentUser(userComplete);

        setUtils(await getUtils(userSemiComplete?.empresaId));
        const activeEmpresa = await getActive(userSemiComplete?.empresaId);
        setConfig(activeEmpresa);
      }

      setPending(false);
    });
  }, []);

  if (pending) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        utils,
        config,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
