import { RouterJson } from "@/navigation/model";
import { useRoutes } from "react-router-dom";

export default function RouterSuperAdmin(props: {
  routes: RouterJson[];
}): JSX.Element {
  const { routes } = props;
  const element = useRoutes(routes);
  return element;
}
