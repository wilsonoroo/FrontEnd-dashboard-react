import ContenidoDetalle from "@/pages/admin/contenido/Contenido";
import ContenidoDetalleV1 from "@/pages/admin/contenido/ContenidoV1";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import DetalleEmpresa from "@/pages/admin/empresas/DetalleEmpresa";
import DivisionPage from "@/pages/admin/gerencias/Division";
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
    path: "empresas/:id",
    element: <DetalleEmpresa titulo={"Gerencia"} />,
    name: "Detalle Empresas ",
    isSubMenu: true,
  },
  {
    path: "empresas/:idEmpresa/:idGerencia",
    element: <DivisionPage titulo={"Detalle Gerencia"} />,
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
    path: "empresas",
    element: <ContenidoDetalleV1 titulo={"Documentos"} />,
    name: "Empresas",
    isSubMenu: false,
  },
  {
    path: "logout",
    element: <LogOutview titulo={"Administrador"} />,
    name: "Admin",
  },
];
