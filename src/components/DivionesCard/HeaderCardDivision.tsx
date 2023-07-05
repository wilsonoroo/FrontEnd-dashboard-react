import { Divisiones } from "@/models/division/Disvision";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsGear } from "react-icons/bs";

export function HeaderCardDivision(props: { item: Divisiones }) {
  const { item } = props;
  return (
    <Box w={"100%"}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Text
          as="b"
          fontSize="2xl"
          me="14px"
          color={"celesteVaku.500"}
          style={{ fontFamily: "'Oswald', sans-serif;" }}
          textStyle="secondary"
        >
          {item.nombre}
        </Text>
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            borderRadius={25}
            size={"md"}
            bg={"white"}
            icon={<BsGear size={24} />}
          />
          <MenuList>
            <MenuItem command="⌘T">New Tab</MenuItem>
            <MenuItem command="⌘N">New Window</MenuItem>
            <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
            <MenuItem command="⌘O">Open File...</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
