import { RouterJson } from "@/navigation/routes";
import { useRoutes } from "react-router-dom";

export default function RouterAdmin(props: {
  routes: RouterJson[];
}): JSX.Element {
  const { routes } = props;
  const element = useRoutes(routes);
  return element;
}
