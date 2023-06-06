// En el archivo PrivateRoute.tsx
import { AuthContext } from "@/contexts/AuthContextFb";
import React, { useContext } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends Omit<RouteProps, "element" | "index"> {
  component: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Route {...rest} element={<Component />} />;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
interface PrivateRouteProps {
  componente: React.ComponentType<any>;
  permisos?: Array<any>;
}

export const PrivateRouteDos: React.FC<PrivateRouteProps> = ({
  componente: Componente,
}) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  console.log(currentUser);

  if (currentUser) {
    return <Componente />;
  } else {
    return <Navigate to="/auth" />;
  }
};
