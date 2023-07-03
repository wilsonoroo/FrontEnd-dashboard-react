import { Avatar, Box, Flex, HStack, Text, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function FotterSidebar(props: {
  user: any;
  collapsed: boolean;
}) {
  const { user, collapsed } = props;

  const variants = {
    collap: { transform: "scale(0.7)", transition: { duration: 0.7 } },
    noCollap: { transform: "scale(1)" },
    rotate: { x: 0, y: 0, rotate: 180 },
    fade: { transform: "scale(1)", y: 0, opacity: 1, delay: 1 },
    fadeOut: { transform: "scale(0)", y: 10, opacity: 0, delay: 1 },
  };

  return (
    <Flex
      justify="space-between"
      direction={{
        base: "row",
        md: "column",
        lg: "row",
        xl: "column",
        "2xl": "row",
      }}
      mb="5"
      py={"2"}
      px={"0"}
    >
      <Box display={"flex"}>
        <Box
          as={motion.div}
          // not work: transition={{ ... }}
          padding="2"
          display="flex"
          pr={3}
          animate={collapsed ? "collap" : "noCollap"}
          initial="hidden"
          variants={variants}
          justifyItems={"center"}
        >
          <WrapItem>
            <Avatar
              name={user.currentUser?.nombre}
              src={user.currentUser?.nombre}
              borderColor={"#fff"}
            />
          </WrapItem>
        </Box>

        {!collapsed ? (
          <Box
            as={motion.div}
            // not work: transition={{ ... }}
            padding="0"
            display="flex"
            pr={0}
            animate={collapsed ? "fadeOut" : "fade"}
            initial="hidden"
            variants={variants}
          >
            <HStack
              flexDirection={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems="baseline"
            >
              <Box>
                <Text
                  fontWeight="bold"
                  me="14px"
                  isTruncated={false}
                  noOfLines={2}
                  maxWidth={"160px"}
                >
                  {user.currentUserAll?.displayName}
                </Text>
              </Box>
              <Box maxW={"160px"} maxWidth={"160px"}>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  isTruncated
                  noOfLines={1}
                  fontWeight="400"
                  me="14px"
                  maxWidth={"160px"}
                >
                  {user.currentUserAll?.email}
                </Text>
              </Box>
            </HStack>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
}
