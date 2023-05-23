// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
// Layout components
import { useDisclosure } from "@chakra-ui/react";
import SidebarContainer from "@components/sidebar/Sidebar";
import RouterAdmin from "@layouts/admin/RoutesAdmin";
import { menuApp, routesAdmin } from "@routes/routes";
import { useState } from "react";
import { createBrowserRouter, useRoutes } from "react-router-dom";

// Custom Chakra theme
export default function Dashboard(props: {
  [x: string]: any;
  toggled: boolean;
}) {
  const { toggled, ...rest } = props;
  // states and functions
  const [fixed] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  // functions for changing the states from components

  const getActiveRoute = (routes: Menus): string => {
    const activeRoute = "Default Brand Text";
    // for (let i = 0; i < routes.length; i++) {
    //   if (
    //     window.location.href.indexOf(
    //       routes[i].layout + "/" + routes[i].path
    //     ) !== -1
    //   ) {
    //     return routes[i].name;
    //   }
    // }

    return activeRoute;
  };
  const getActiveNavbar = (routes: Menus): boolean => {
    const activeNavbar = true;
    // for (let i = 0; i < routes.length; i++) {
    //   if (
    //     window.location.href.indexOf(
    //       routes[i].layout + "/" + routes[i].path
    //     ) !== -1
    //   ) {
    //     return routes[i].secondary;
    //   }
    // }
    console.log(activeNavbar);
    return activeNavbar;
  };
  const getActiveNavbarText = (routes: Menus): string | boolean => {
    const activeNavbar = false;
    // for (let i = 0; i < routes.length; i++) {
    //   if (
    //     window.location.href.indexOf(
    //       routes[i].layout + "/" + routes[i].path
    //     ) !== -1
    //   ) {
    //     return routes[i].name;
    //   }
    // }
    // console.log(activeNavbar);
    return activeNavbar;
  };

  // eslint-disable-next-line prefer-const
  let rutas = createBrowserRouter(routesAdmin);
  useRoutes(routesAdmin);
  console.log(rutas, routesAdmin);

  const { onOpen } = useDisclosure();
  return (
    <Box id="containerAdmin">
      <Flex>
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
            md: !toggled ? "calc( 100% - 85px )" : "calc( 100% - 250px )",
            xl: !toggled ? "calc( 100% - 85px )" : "calc( 100% - 250px )",
          }}
        >
          <Box
            float="right"
            height="100%"
            overflow="auto"
            position="relative"
            px={"50px"}
            maxHeight="100vh"
            w={{ base: "100%", md: "100%", xl: "100%" }}
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            {/* <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PROsss"}
                brandText={""}
                secondary={true}
                message={""}
                // brandText={getActiveRoute(routes)}
                // secondary={getActiveNavbar(routes)}
                // message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>  */}

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
        {/* <Box display={{ sm: "none", xl: "block" }} position="fixed" minH="100%">
          <SidebarContext.Provider
            value={{
              toggleSidebar,
              setToggleSidebar,
            }}
          >
            <Sidebar
              routes={routes}
              transitionDuration={1000}
              display="none"
              {...rest}
            />
          </SidebarContext.Provider>
        </Box>
        <Box
          float="right"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: "100%", md: "100%", xl: "100%" }}
          maxWidth={{
            base: "100%",
            md: "calc( 100% - 85px )",
            xl: "calc( 100% - 85px )",
          }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {/* <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PROsss"}
                brandText={""}
                secondary={true}
                message={""}
                // brandText={getActiveRoute(routes)}
                // secondary={getActiveNavbar(routes)}
                // message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal> 

          {
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <RouterAdmin />
            </Box>
          }
        </Box> */}
      </Flex>

      {/* <Outlet /> */}
    </Box>
  );
}
