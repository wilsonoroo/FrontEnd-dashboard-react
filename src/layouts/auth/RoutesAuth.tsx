import { routesAuth } from "@/navigation/route/route.auth";
import { useRoutes } from "react-router-dom";

export default function RoutesAuth(): JSX.Element {
  const element = useRoutes(routesAuth);
  return element;
}
