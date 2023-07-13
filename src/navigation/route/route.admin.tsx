import ContenidoDetalleAdminConfig from "@/pages/admin/config/ContenidoDetalleAdminConfig";
import DetalleGerenciaAdminConfig from "@/pages/admin/config/DetalleGerenciaAdminConfig";
import DetalleEmpresaAdminConfig from "@/pages/admin/config/GerenciasAdminConfig";
import ContenidoDetalleAdminRecursos from "@/pages/admin/contenido/ContenidoDetalleAdminRecursos";
import ContenidoDocs from "@/pages/admin/contenido/ContenidoDocs";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import EmpresasView from "@/pages/admin/empresas/EmpresasView";
import LogOutview from "@/pages/admin/logOut/LogOutview";
// import {App} from "@/components/dashboard/LineChart"
// import {App} from "@/components/dashboard/BarChart"
// import {App} from "@/components/dashboard/PieChart"
import {App} from "@/components/dashboard/index"
import { RouterJson } from "../model";

export const routesAdmin: RouterJson[] = [
  {
    path: "/",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />,
    name: "Empresas",
  },

  {
    path: "/dashboard",
    element: <App/>,
    name: "Dashboard",
  },
  {
    path: "/admin",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />,
    name: "Admin",
  },

  {
    path: "recursos",
    element: <ContenidoDetalleAdminRecursos titulo={"Gerencias"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "empresas",
    element: <EmpresasView titulo={"Empresas"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "config",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />, //todas las gerencias
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "home",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "config/:idEmpresa/:idGerencia",
    element: <DetalleGerenciaAdminConfig titulo={"Divisiones"} />, //todas las divisiones de la gerencia
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "config/:idEmpresa/:idGerencia/:idDivision",
    element: <ContenidoDetalleAdminConfig titulo={"Division"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: ":idEmpresa/:idGerencia/:idDivision",
    element: <ContenidoDocs titulo={"Division"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "v1/empresas/:idEmpresa",
    element: <DocumentosViewV1 titulo={"Documentos"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "v1/empresas/",
    element: <DocumentosViewV1 titulo={"Documentos"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "logout",
    element: <LogOutview titulo={"Administrador"} />,
    name: "Admin",
  },
];
