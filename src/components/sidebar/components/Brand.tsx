// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { HSeparator } from "@components/separator/Separator";

// Custom components

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue("orange.500", "white");

  return (
    <Flex alignItems="center" flexDirection="column">
      {/* <img
        src={VakuLogo}
        alt=""
        width={175}
        height={26}
        style={{ paddingBottom: 50 }}
      /> */}
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
