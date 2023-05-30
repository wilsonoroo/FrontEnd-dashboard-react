// Admin Imports

import {
  ActionFunction,
  LazyRouteFunction,
  LoaderFunction,
  NonIndexRouteObject,
  RouteObject,
  ShouldRevalidateFunction,
} from "react-router-dom";

// Auth Imports
import ContenidoDetalle from "@/pages/admin/contenido/Contenido";
import DocumentosViewV1 from "@/pages/admin/contenido/documentos/DocumentosViewV1";
import DivisionPage from "@/pages/admin/gerencias/Division";
import { Icon } from "@chakra-ui/react";
import { ComponentType, ReactNode } from "react";
import { MdGroups2, MdHome, MdLock } from "react-icons/md";
import DetalleEmpresa from "../pages/admin/empresas/DetalleEmpresa";
import SignInCentered from "../pages/auth/signIn";

export const menuApp: Menus[] = [
  {
    menu: [
      {
        titulo: "Gerencias",
        id: "empresas",
        layout: "admin",
        path: "empresas",
        icon: (
          <Icon as={MdGroups2} width="20px" height="20px" color="inherit" />
        ),
        sections: [
          {
            titulo: "Empresa",
            route: "v1/empresas",
            icon: (
              <Icon as={MdGroups2} width="20px" height="20px" color="inherit" />
            ),
            id: "empresa2",
            items: [
              {
                titulo: "Documentos",
                route: "",
                isVisible: true,
              },
              {
                titulo: "Profile",
                route: "profile",
                isVisible: true,
              },
              {
                titulo: "Documentos",
                route: "features",
                isVisible: true,
              },
              {
                titulo: "Configuracion",
                route: "features",
                isVisible: false,
              },
            ],
          },
        ],
      },

      {
        titulo: "Main Dashboard",
        layout: "admin",
        path: "default",
        id: "main_dash",

        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      },
    ],
    views: ["admin"],
  },
  {
    menu: [
      {
        titulo: "Sign In",
        layout: "auth",
        path: "sign-in",
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,

        sections: [
          {
            titulo: "Empresas",
            route: "features",

            icon: (
              <Icon as={MdHome} width="20px" height="20px" color="inherit" />
            ),
            id: "empresa",
            items: [
              {
                titulo: "Gerencias",
                route: "features",
              },
              {
                titulo: "Divisiones",
                route: "features",
              },
              {
                titulo: "Empresas",
                route: "features",
              },
            ],
          },
          {
            titulo: "Documentos",
            route: "features",

            id: "empresa",
            items: [
              {
                titulo: "Empresas",
                route: "features",
              },
              {
                titulo: "Empresas",
                route: "features",
              },
              {
                titulo: "Empresas",
                route: "features",
              },
            ],
          },
        ],
      },
    ],
    views: ["auth"],
  },
];
export interface IRouteObject extends NonIndexRouteObject {
  name?: string;
  children?: IRouteObject[];
}

export class RouterJson implements IRouteObject {
  name?: string;
  children?: IRouteObject[];
  caseSensitive?: boolean;
  path?: string;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  hasErrorBoundary?: boolean;
  shouldRevalidate?: ShouldRevalidateFunction;
  handle?: any;
  index?: false;
  element?: ReactNode;
  errorElement?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Component?: ComponentType<{}>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  ErrorBoundary?: ComponentType<{}>;
  lazy?: LazyRouteFunction<NonIndexRouteObject>;
  isSubMenu?: boolean;
  categoria?: string;
}

/**
 * funcion definitica para las rutas de admin
 */
export const routesAdmin: RouterJson[] = [
  {
    path: "/",
    element: <DocumentosViewV1 titulo={"Documentos"} />,
    name: "Empresas",
  },
  {
    path: "/admin",
    element: <DocumentosViewV1 titulo={"Documentos"} />,
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
    element: <DocumentosViewV1 titulo={"Documentos"} />,
    name: "Empresas",
    isSubMenu: false,
  },
];

export const routesAuth: RouteObject[] = [
  {
    path: "/",
    element: <SignInCentered />,
  },
  {
    path: "sign-in",
    element: <SignInCentered />,
  },
];

// {
//   name: "RTL Admin",
//   layout: "/rtl",
//   path: "/rtl-default",
//   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
//   component: RTL,
// },

// export default routes;
