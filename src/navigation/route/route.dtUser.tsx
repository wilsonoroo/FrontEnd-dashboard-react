import LogOutview from "@/pages/admin/logOut/LogOutview";
import EmpresasUsuarioDtView from "@/pages/userDt/empresas/EmpresasView";
import DetalleEmpresaDTConfig from "@/pages/userDt/gerencia/DetalleEmpresaDTConfig";
import DetalleGerenciaDT from "@/pages/userDt/gerencia/DetalleGerenciaDT";
import DetalleGerenciaUsuarioDT from "@/pages/userDt/gerencia/DetalleGerenciaUsuarioDT";
import ContenidoDocsDT from "@/pages/userDt/gerencia/contenido/ContenidoDocsDT";
import ContenidoDocsDTV1 from "@/pages/userDt/gerencia/contenido/ContenidoDocsDTV1";
import { RouterJson } from "../model";

export const routesDtUser: RouterJson[] = [
  {
    path: "/",
    element: <EmpresasUsuarioDtView titulo={"Gerencias"} />,
    name: "Empresas",
  },
  {
    path: "/empresa",
    element: <EmpresasUsuarioDtView titulo={"Gerencias"} />,
    name: "Empresas",
  },

  {
    path: "empresa/:idEmpresa",
    element: <DetalleEmpresaDTConfig titulo={"Divisiones"} />, //todas las divisiones de la gerencia
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "empresa/:idEmpresa/:idGerencia",
    element: <DetalleGerenciaUsuarioDT titulo={"Divisiones"} />, //todas las divisiones de la gerencia
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "empresa/:idEmpresa/:idGerencia/:idDivision",
    element: <ContenidoDocsDT titulo={"Division"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: ":idEmpresa/:idGerencia/:idDivision",
    element: <DetalleGerenciaDT titulo={"Division"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "v1/empresas/:idEmpresa",
    element: <ContenidoDocsDTV1 titulo={"Documentos"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "logout",
    element: <LogOutview titulo={"Administrador"} />,
    name: "Admin",
  },
];
