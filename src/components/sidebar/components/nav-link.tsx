import { Flex, useColorModeValue } from "@chakra-ui/react";

import { useState } from "react";

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
const NavLink = (props: {
  children: JSX.Element;
  // | (({ isActive }: { isActive: boolean }) => JSX.Element);
  routes: Menus;
}) => {
  const { routes, children } = props;
  const color = useColorModeValue("gray.600", "gray.300");
  const [active, setActive] = useState(false);

  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color="inherit"
      _dark={{
        color: "gray.400",
      }}
      _hover={{
        bg: "gray.100",
        _dark: {
          bg: "gray.900",
        },
        color: "gray.900",
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...props}
    >
      {children}

      <></>
    </Flex>
  );
};
{
  /* {runIfFn(children, { isActive: active })} */
}
{
  /* {routes.icon && routes.icon} */
}

export default NavLink;
