/* eslint-disable */

import { useLocation } from "react-router-dom";
// chakra imports
import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { SidebarContent } from "./sidebar-content";

export function SidebarLinks(props: { routes: Menus[] }) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("vaku.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("vaku.500", "vaku.500");
  let ttpColor = useColorModeValue("verdevaku.500", "vaku.500");
  const integrations = useDisclosure();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes: Menus[]) => {
    return <SidebarContent routes={routes} />;
    // return routes.map((route: RoutesType, index: number) => {
    //   if (route.layout === "admin" || route.layout === "auth") {
    //     return (
    //       <chakra.div key={route.name} pt={index === 0 ? 0 : 5}>
    //         <Box>
    //           <HStack
    //             spacing={
    //               activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
    //             }
    //             py="5px"
    //             ps="10px"
    //           >
    //             <Flex w="100%" alignItems="center" justifyContent="center">
    //               <Box
    //                 color={
    //                   activeRoute(route.path.toLowerCase())
    //                     ? activeIcon
    //                     : textColor
    //                 }
    //                 me="18px"
    //               >
    //                 {route.icon}
    //               </Box>
    //               <Text
    //                 me="auto"
    //                 color={
    //                   activeRoute(route.path.toLowerCase())
    //                     ? activeColor
    //                     : textColor
    //                 }
    //                 fontWeight={
    //                   activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
    //                 }
    //               >
    //                 {route.name}
    //               </Text>
    //             </Flex>
    //             <Box
    //               h="36px"
    //               w="4px"
    //               bg={
    //                 activeRoute(route.path.toLowerCase())
    //                   ? ttpColor
    //                   : "transparent"
    //               }
    //               borderRadius="5px"
    //             />
    //           </HStack>
    //         </Box>

    //         {route?.sections ? (
    //           route.sections.map(function (section: any) {
    
    //             return (
    //               <SidebarSection
    //                 section={section.items}
    //                 key={section.titulo}
    //                 route={route}
    //               />
    //             );
    //           })
    //         ) : (
    //           <>aaa</>
    //         )}
    //       </chakra.div>
    //     );
    //   }
    // });
  };
  //  BRAND
  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
