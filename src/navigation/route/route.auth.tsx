import SignInCentered from "@pages/auth/signIn";
import { RouteObject } from "react-router-dom";

export const routesAuth: RouteObject[] = [
  {
    path: "/",
    element: <SignInCentered />,
  },
  {
    path: "sign-in",
    element: <SignInCentered />,
  },
];
