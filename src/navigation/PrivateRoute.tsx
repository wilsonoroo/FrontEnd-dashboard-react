// En el archivo PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// interface PrivateRouteProps extends Omit<RouteProps, "element" | "index"> {
//   component: React.ComponentType<any>;
// }

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Route {...rest} element={<Component />} />;
//   } else {
//     return <Navigate to="/auth" replace />;
//   }
// };

import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
interface PrivateRouteProps {
  children: JSX.Element;
  permisos?: Array<any>;
}

export const PrivateRouteDos: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  let location = useLocation();

  useEffect(() => {
    console.log(currentUser);
    console.log("🚀 ~ file: PrivateRoute.tsx:33 ~ location:", location);
  }, [currentUser]);

  if (!currentUser) {
    console.log("🚀 ~ file: PrivateRoute.tsx:42 ~ currentUser:", currentUser);
    // Redirect the user to the home page.
    // Please! Close the mustache {{}}

    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
