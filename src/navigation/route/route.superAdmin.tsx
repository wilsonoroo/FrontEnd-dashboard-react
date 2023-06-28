import ContenidoDetalle from "@/pages/admin/contenido/ContenidoAdmin";
import ContenidoDetalleV1 from "@/pages/admin/contenido/ContenidoV1";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import Empresas from "@/pages/admin/empresas";
import DetalleGerencia from "@/pages/admin/gerencias/DetalleGerenciaAdmin";
import DetalleEmpresa from "@/pages/admin/gerencias/GerenciasAdmin";
import LogOutview from "@/pages/admin/logOut/LogOutview";
import { RouterJson } from "../model";
import ContenidoDetalleAdminConfig from "@/pages/admin/config/ContenidoDetalleAdminConfig";
import DetalleEmpresaAdminConfig from "@/pages/admin/config/GerenciasAdminConfig";
import DetalleGerenciaAdminConfig from "@/pages/admin/config/DetalleGerenciaAdminConfig";
import ContenidoDetalleAdmin from "@/pages/admin/contenido/ContenidoAdmin";

export const routesSuperAdmin: RouterJson[] = [
  {
    path: "/",
    element: <ContenidoDetalleV1 titulo={"Administrador"} />,
    name: "Empresas",
  },
  {
    path: "/superAdmin",
    element: <ContenidoDetalleV1 titulo={"Administrador"} />,
    name: "Admin",
  },
  {
    path: "empresas",
    element: <Empresas titulo={"Empresas"} />,
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
    path: "empresas/:id",
    element: <DetalleEmpresa titulo={"Gerencias"} />, //todas las gerencias
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "empresas/:idEmpresa/:idGerencia",
    element: <DetalleGerencia titulo={"Divisiones"} />, //todas las divisiones de la gerencia
    name: "Detalle Empresas ",
    isSubMenu: true,
  },

  {
    path: "empresas/:idEmpresa/:idGerencia/:idDivision",
    element: <ContenidoDetalle titulo={"Division"} />,
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

  {
    path: "home",
    element: <ContenidoDetalleAdminConfig titulo={"Gerencias"} />, //todas las gerencias
    // element: <ContenidoDetalleAdmin titulo={"Gerencias"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },


  

];
