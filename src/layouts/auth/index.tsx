import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/contexts/AuthContextFb";
import { routesAuth } from "@/navigation/route/route.auth";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { SidebarContext } from "@contexts/SidebarContext";
import RoutesAuth from "@layouts/auth/RoutesAuth";
import { useNavigate, useRoutes } from "react-router-dom";
// Layout components
// import { SidebarContext } from "contexts/SidebarContext";

// Custom Chakra theme
export default function Auth() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate("/admin/");
    }
  }, [currentUser]);
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const getRoute = () => {
    return window.location.pathname !== "/auth/full-screen-maps";
  };

  useRoutes(routesAuth);
  const authBg = useColorModeValue("white", "navy.900");

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {getRoute() ? (
            <Box mx="auto" minH="100vh">
              <RoutesAuth />
            </Box>
          ) : null}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
