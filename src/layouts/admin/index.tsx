// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
// Layout components
import SidebarContainer from "@components/sidebar/Sidebar";
import RouterAdmin from "@layouts/admin/RoutesAdmin";
import { menuApp, routesAdmin } from "@routes/routes";
import { createBrowserRouter, useRoutes } from "react-router-dom";

// Custom Chakra theme
export default function Dashboard(props: { [x: string]: any }) {
  const { toggled, ...rest } = props;

  // const getActiveRoute = (routes: Menus): string => {
  //   const activeRoute = "Default Brand Text";
  //   // for (let i = 0; i < routes.length; i++) {
  //   //   if (
  //   //     window.location.href.indexOf(
  //   //       routes[i].layout + "/" + routes[i].path
  //   //     ) !== -1
  //   //   ) {
  //   //     return routes[i].name;
  //   //   }
  //   // }

  //   return activeRoute;
  // };
  // const getActiveNavbar = (routes: Menus): boolean => {
  //   const activeNavbar = true;
  //   // for (let i = 0; i < routes.length; i++) {
  //   //   if (
  //   //     window.location.href.indexOf(
  //   //       routes[i].layout + "/" + routes[i].path
  //   //     ) !== -1
  //   //   ) {
  //   //     return routes[i].secondary;
  //   //   }
  //   // }

  //   return activeNavbar;
  // };
  // const getActiveNavbarText = (routes: Menus): string | boolean => {
  //   const activeNavbar = false;
  //   // for (let i = 0; i < routes.length; i++) {
  //   //   if (
  //   //     window.location.href.indexOf(
  //   //       routes[i].layout + "/" + routes[i].path
  //   //     ) !== -1
  //   //   ) {
  //   //     return routes[i].name;
  //   //   }
  //   // }
  //   // console.log(activeNavbar);
  //   return activeNavbar;
  // };

  // eslint-disable-next-line prefer-const
  let rutas = createBrowserRouter(routesAdmin);
  useRoutes(routesAdmin);

  return (
    <Box id="containerAdmin">
      <Flex id="sidebar-flex">
        <SidebarContainer
          menu={menuApp}
          transitionDuration={1000}
          display="none"
          {...rest}
        ></SidebarContainer>

        <Box
          w="max-content"
          height="100%"
          maxHeight="100%"
          width={"100%"}
          maxWidth={{
            base: "100%",
            md: !toggled ? "calc( 100% - 85px )" : "calc( 100% - 210px )",
            xl: !toggled ? "calc( 100% - 85px )" : "calc( 100% - 210px )",
          }}
        >
          <Box
            float="right"
            height="100%"
            overflow="auto"
            position="relative"
            px={"5px"}
            maxHeight="100vh"
            w={{ base: "100%", md: "100%", xl: "100%" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            {
              <Box
                mx="auto"
                p={{ base: "20px", md: "30px" }}
                pe="20px"
                minH="100vh"
                pt="50px"
              >
                <RouterAdmin routes={routesAdmin} />
              </Box>
            }
          </Box>
        </Box>
      </Flex>

      {/* <Outlet /> */}
    </Box>
  );
}
