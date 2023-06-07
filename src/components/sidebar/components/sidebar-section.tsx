import {
  chakra,
  Collapse,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { HiChevronRight } from "react-icons/hi";
import NavLink from "./nav-link";

export type SidebarSectionProps = { section: any; route: Menus };

export const SidebarSection = (props: SidebarSectionProps) => {
  const { section, route } = props;

  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  const subComps = useDisclosure();

  return (
    <>
      <Flex align="center">
        <NavLink routes={route}>
          <chakra.span
            display="block"
            py="2"
            fontSize="sm"
            textTransform="capitalize"
            cursor="pointer"
            _dark={{
              color: inactiveColor, //isActive ? activeColor : inactiveColor,
            }}
            fontWeight={"inherit"} //isActive ? "semibold" : "inherit"}
          >
            {section.titulo}
          </chakra.span>
          {/* {({ isActive }) => (
           
          )} */}
        </NavLink>
        {section.items.length && (
          <IconButton
            icon={<HiChevronRight />}
            aria-label="Toggle Section"
            size="xs"
            isRound
            ml="auto"
            mr="2"
            variant="ghost"
            onClick={subComps.onToggle}
          />
        )}
      </Flex>
      <Collapse in={subComps.isOpen}>
        {section?.items.map((component: any, cid: any) => (
          <NavLink key={cid} routes={route}>
            <chakra.span
              cursor="pointer"
              display="block"
              fontSize="sm"
              textTransform="capitalize"
              py="1"
              ml="2"
            >
              {component.titulo}
            </chakra.span>
          </NavLink>
        ))}
      </Collapse>
    </>
  );
};
