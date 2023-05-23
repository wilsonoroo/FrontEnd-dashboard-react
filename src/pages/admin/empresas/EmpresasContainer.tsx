import { Outlet, useParams } from "react-router-dom";

export default function EmpresasContainer() {
  const params = useParams();
  console.log(params);
  return <Outlet />;
}
