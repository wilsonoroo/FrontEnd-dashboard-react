import ContenidoDetalleAdminConfig from "@/pages/admin/config/ContenidoDetalleAdminConfig";
import DetalleGerenciaAdminConfig from "@/pages/admin/config/DetalleGerenciaAdminConfig";
import DetalleEmpresaAdminConfig from "@/pages/admin/config/GerenciasAdminConfig";
import ContenidoDetalleAdmin from "@/pages/admin/contenido/ContenidoAdmin";
import ContenidoDocs from "@/pages/admin/contenido/ContenidoDocs";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import Empresas from "@/pages/admin/empresas";
import LogOutview from "@/pages/admin/logOut/LogOutview";
import { RouterJson } from "../model";

export const routesAdmin: RouterJson[] = [
  {
    path: "/",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />,
    name: "Empresas",
  },
  {
    path: "/admin",
    element: <DetalleEmpresaAdminConfig titulo={"Gerencias"} />,
    name: "Admin",
  },

  {
    path: "recursos",
    element: <ContenidoDetalleAdmin titulo={"Gerencias"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
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
