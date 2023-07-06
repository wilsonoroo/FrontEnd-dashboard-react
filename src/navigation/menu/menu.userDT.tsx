// Admin Imports

// Auth Imports
import { IconCerrarSesion } from "@/assets/icon/IconCerrarSesion";
import { IconHome } from "@/assets/icon/IconHome";
import { IconPerfil } from "@/assets/icon/IconPerfil";
import { Icon } from "@chakra-ui/react";
import { MdHome, MdLock } from "react-icons/md";

export const menuApp: Menus[] = [
  {
    menu: [
      {
        titulo: "Inicio",
        layout: "admin",
        path: "/admin/config",
        id: "main_dash",
        icon: (
          <Icon
            viewBox="0 0 78 78"
            width="20px"
            //height="20px"
            color="inherit"
          >
            <IconHome />
          </Icon>
        ),
      },

      {
        titulo: "Perfil",
        layout: "admin",
        path: "/admin/perfil",
        id: "main_dash",
        disabled: true,
        icon: (
          <Icon width="20px" height="20px" color="inherit">
            <IconPerfil />
          </Icon>
        ),
      },

      {
        titulo: "Cerrar Sesión",
        layout: "admin",
        path: "logout",
        id: "logout",

        icon: (
          <Icon width="20px" height="20px" color="inherit">
            <IconCerrarSesion />
          </Icon>
        ),
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
