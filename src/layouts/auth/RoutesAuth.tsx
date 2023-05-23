import { useRoutes } from "react-router-dom";
import { routesAuth } from "../../routes/routes";

export default function RoutesAuth(): JSX.Element {
  const element = useRoutes(routesAuth);
  return element;
}
