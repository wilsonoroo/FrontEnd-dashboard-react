import React, { useState } from "react";

// chakra imports
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Content from "../sidebar/components/Content";
// Assets
import {
  renderThumb,
  renderTrack,
  renderView,
} from "@components/scrollbar/Scrollbar";
import { IoMenuOutline } from "react-icons/io5";
import { Sidebar } from "react-pro-sidebar";
import { SidebarPro } from "./proSidebar";

function SidebarContainer(props: { menu: Menus[]; [x: string]: any }) {
  const { menu } = props;
  const [collapsed, setCollapsed] = useState(false);

  const variantChange = "0.2s linear";
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  const sidebarBg = useColorModeValue("white", "vaku.500");
  const sidebarMargins = "0px";

  // sm: '30em', // 480px
  // md: '48em', // 768px
  // lg: '62em', // 992px
  // xl: '80em', // 1280px
  // '2xl': '96em',
  const buttonSize = useBreakpointValue({
    sm: { size: "sm", value: "0px" },
    md: { size: "md", value: "85px" },
    lg: { size: "lg", value: "85px" },
    xl: { size: "xl", value: "85px" },
    "2xl": { size: "2xl", value: "85px" },
  });

  // SIDEBAR
  return (
    <Sidebar
      backgroundColor={"#fff"}
      rootStyles={{
        borderColor: "#fff",
      }}
      collapsed={collapsed}
      collapsedWidth={buttonSize?.value}
      breakPoint="sm"
      width="210px"
    >
      <Box display={{ base: "flex" }} minH="100%" id="sidebar-contentedor">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          maxWidth={{ sm: "0px", md: "210px", xl: "210px" }}
          w={{ sm: "0px", md: "210px", xl: "210px" }}
          h="100vh"
          m={sidebarMargins}
          minH="100%"
          overflowX="hidden"
          boxShadow={shadow}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={renderThumb}
            renderView={renderView}
          >
            <SidebarPro
              key={"sidebar"}
              menu={menu}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
            />
          </Scrollbars>
        </Box>
      </Box>
    </Sidebar>
  );
}

// FUNCTIONS
export function SidebarResponsive(props: { routes: Menus[] }) {
  const sidebarBackgroundColor = useColorModeValue("white", "vaku.500");
  const menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="240px" maxW="240px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="240px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

export default SidebarContainer;
