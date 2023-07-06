// Chakra imports
import { menuApp } from "@/navigation/menu/menu.userDT";
import { Box, Flex } from "@chakra-ui/react";
// Layout components

import { routesDtUser } from "@/navigation/route/route.dtUser";
import SidebarContainer from "@components/sidebar/Sidebar";
import { createBrowserRouter, useRoutes } from "react-router-dom";
import RouterDt from "./RoutesDt";

// Custom Chakra theme
export default function DtLayout(props: { [x: string]: any }) {
  const { toggled, ...rest } = props;

  // eslint-disable-next-line prefer-const
  let rutas = createBrowserRouter(routesDtUser);
  useRoutes(routesDtUser);

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
                <RouterDt routes={routesDtUser} />
              </Box>
            }
          </Box>
        </Box>
      </Flex>

      {/* <Outlet /> */}
    </Box>
  );
}
