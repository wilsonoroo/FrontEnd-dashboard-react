// Admin Imports

// Auth Imports
import { Icon } from "@chakra-ui/react";
import { BiUserX } from "react-icons/bi";
import {
  MdAutoGraph,
  MdHome,
  MdLock,
  MdOutlineSettings,
  MdPerson2,
} from "react-icons/md";

export const menuApp: Menus[] = [
  {
    menu: [
      {
        titulo: "Inicio",
        layout: "admin",
        path: "/admin/home",
        id: "main_dash",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      },
      {
        titulo: "Recursos",
        layout: "admin",
        path: "/admin/home",
        id: "main_dash",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
      },

      {
        titulo: "Perfil",
        layout: "admin",
        path: "/admin/perfil",
        id: "main_dash",
        disabled: true,
        icon: (
          <Icon as={MdPerson2} width="20px" height="20px" color="inherit" />
        ),
      },
      {
        titulo: "Configuración",
        layout: "admin",
        path: "/admin/config",
        id: "main_dash",
        disabled: false,
        icon: (
          <Icon
            as={MdOutlineSettings}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
      },

      {
        titulo: "Dashboard",
        layout: "admin",
        path: "/usuarios",
        id: "main_dash",
        disabled: true,
        icon: (
          <Icon as={MdAutoGraph} width="20px" height="20px" color="inherit" />
        ),
      },

      {
        titulo: "Cerrar Sesión",
        layout: "admin",
        path: "logout",
        id: "logout",

        icon: <Icon as={BiUserX} width="20px" height="20px" color="inherit" />,
      },

      // {
      //   titulo: "Main Dashboard",
      //   layout: "admin",
      //   path: "default",
      //   id: "main_dash",

      //   icon: (
      //     <Icon
      //       as={MdOutlineAddChart}
      //       width="20px"
      //       height="20px"
      //       color="inherit"
      //     />
      //   ),
      // },
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
