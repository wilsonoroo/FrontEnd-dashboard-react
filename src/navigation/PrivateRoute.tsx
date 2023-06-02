import { AuthContext } from "@/contexts/AuthContextFb";
import React, { useContext } from "react";
import { Navigate, RouteProps, Route as RouterRoute } from "react-router-dom";

interface PrivateRouteProps extends Omit<RouteProps, "element" | "index"> {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(AuthContext);

  return (
    <RouterRoute
      {...rest}
      element={user ? <Component {...rest} /> : <Navigate to="/auth" replace />}
    />
  );
};

export default PrivateRoute;
