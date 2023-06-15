import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { HiEllipsisVertical, HiOutlineBuildingOffice2 } from "react-icons/hi2";

export function HeaderCardDivision({}) {
  return (
    <Box w={"100%"}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Avatar
          bg="cyan"
          size="xs"
          icon={<HiOutlineBuildingOffice2 fontSize="1.0rem" />}
        />
        <Spacer />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            borderRadius={25}
            size={"md"}
            bg={"white"}
            icon={<HiEllipsisVertical size={24} />}
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
