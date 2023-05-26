import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import useAuth from "@hooks/useAuth";
import { motion } from "framer-motion";
import { Menu, MenuItem, SubMenu, menuClasses } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { HSeparator } from "../separator/Separator";
import FotterSidebar from "./components/FotterSidebar";

import { Dispatch, SetStateAction } from "react";
import { SidebarHeader } from "./components/SidebarHeader";

const hexToRgba = (
  hex: string,
  alpha: number,
  setCollapsed: (collapsed: boolean) => void
) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function SidebarPro(props: {
  menu: Menus[];
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  const { menu, collapsed, setCollapsed } = props;
  const textColor = useColorModeValue("vaku.700", "white");
  const userAuth = useAuth();

  const variants = {
    rotate: { rotate: -180, transition: { duration: 0.4 } },
    rotatePos: { rotate: 0, transition: { duration: 0.4 } },
  };

  return (
    <Flex
      direction="column"
      height="100%"
      w={"100%"}
      pt="25px"
      borderRadius="30px"
    >
      {/* <Brand /> */}
      <SidebarHeader style={{ marginBottom: "24px", marginTop: "16px" }} />
      <Stack direction="column" mt="8px" mb="auto">
        <Box ps="20px" pe={{ lg: "16px", "2xl": "16px" }} p={0}>
          {menu
            .filter((item) => item.views.includes("admin"))
            .map((item, index) => {
              return item.menu.map((categoria, subIndex) => {
                return (
                  <Menu
                    key={"car-" + categoria.id + "-" + index + "-" + subIndex}
                    menuItemStyles={{
                      button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree

                        if (level === 0)
                          return {
                            color: disabled ? "#00244d" : "#00244d",
                            backgroundColor: active ? "#9cff00" : undefined,
                          };
                      },
                    }}
                  >
                    {!categoria?.sections ? (
                      <NavLink to={categoria.path} end>
                        {({ isActive, isPending }) => (
                          <MenuItem icon={categoria?.icon} active={isActive}>
                            {categoria?.titulo}
                          </MenuItem>
                        )}
                      </NavLink>
                    ) : (
                      categoria?.sections.map((subMenu, subIndex2) => {
                        return (
                          <SubMenu
                            key={
                              "sub-" +
                              categoria.id +
                              "-" +
                              subMenu.id +
                              "-" +
                              index +
                              "-" +
                              subIndex +
                              "-" +
                              subIndex2
                            }
                            defaultOpen
                            label={subMenu.titulo}
                            rootStyles={{
                              ["& > ." + menuClasses.button]: {
                                backgroundColor: "#fff",
                              },
                              ["." + menuClasses.subMenuContent]: {
                                backgroundColor: "#f7f7f7",
                              },
                              ["." + menuClasses.button]: {
                                color: "#0a6ddc",
                              },
                            }}
                            icon={subMenu.icon}
                          >
                            {subMenu.items.map((item, indexSM) => {
                              if (item?.isVisible && item.isVisible) {
                                return (
                                  <NavLink
                                    key={
                                      "submenu-" +
                                      index +
                                      "-" +
                                      subIndex +
                                      "-" +
                                      subIndex2 +
                                      "-" +
                                      indexSM
                                    }
                                    to={subMenu.route + "/" + item.route}
                                    end
                                  >
                                    {({ isActive, isPending }) => (
                                      <MenuItem key={indexSM} active={isActive}>
                                        {item.titulo + isPending}
                                      </MenuItem>
                                    )}
                                  </NavLink>
                                );
                              } else {
                                return <></>;
                              }
                            })}
                          </SubMenu>
                        );
                      })
                    )}
                  </Menu>
                );
              });
            })}
        </Box>
      </Stack>

      <Box
        pe={{ lg: "16px", "2xl": "20px" }}
        mt="5px"
        ml={2}
        mr={2}
        borderRadius="30px"
      >
        <Box
          display="flex"
          justifyContent={!collapsed ? "end" : "center"}
          alignItems={"center"}
        >
          <Box
            as={motion.div}
            // not work: transition={{ ... }}
            padding="2"
            display="flex"
            pr={3}
            initial="hidden"
            variants={variants}
            animate={!collapsed ? "rotate" : "rotatePos"}
          >
            <ChevronRightIcon
              onPointerDownCapture={(e) => e.stopPropagation()}
              onClick={function () {
                setCollapsed(!collapsed);
              }}
              w={35}
              h={35}
            />
          </Box>
        </Box>
        <HSeparator mb="0px" />
        <FotterSidebar user={userAuth} collapsed={collapsed} />
      </Box>
    </Flex>
  );
}
