import ContenidoDetalle from "@/pages/admin/contenido/Contenido";
import ContenidoDetalleV1 from "@/pages/admin/contenido/ContenidoV1";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import Empresas from "@/pages/admin/empresas";
import DetalleGerencia from "@/pages/admin/gerencias/DetalleGerencia";
import DetalleEmpresa from "@/pages/admin/gerencias/Gerencias";
import LogOutview from "@/pages/admin/logOut/LogOutview";
import { RouterJson } from "../model";

export const routesAdmin: RouterJson[] = [
  {
    path: "/",
    element: <ContenidoDetalleV1 titulo={"Administrador"} />,
    name: "Empresas",
  },
  {
    path: "/admin",
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
];
