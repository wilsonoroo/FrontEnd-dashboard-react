import { Avatar, Box, Flex, HStack, Text, WrapItem } from "@chakra-ui/react";

type Props = {
  name: string;
  displayName: string;
  fotografia: { url: string };
  cargo: string;
};
export const ItemUser = (props: Props) => {
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
    >
      <Box display={"flex"}>
        <Box
          // not work: transition={{ ... }}
          padding="0"
          display="flex"
          pr={1}
          justifyItems={"center"}
          alignItems={"center"}
        >
          <WrapItem>
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src={props.fotografia.url}
              borderColor={"#fff"}
            />
          </WrapItem>
        </Box>

        <Box
          // not work: transition={{ ... }}
          padding="0"
          display="flex"
          pr={0}
        >
          <HStack
            flexDirection={"column"}
            display={"flex"}
            justifyContent={"center"}
            alignItems="baseline"
          >
            <Box>
              <Text
                me="7px"
                color="vaku"
                isTruncated={false}
                noOfLines={2}
                fontSize={{
                  base: "sm",
                }}
                maxWidth={"160px"}
              >
                {props.displayName}
              </Text>
            </Box>
            <Box maxW={"160px"} maxWidth={"160px"}>
              <Text
                color="vaku.600"
                fontSize={{
                  base: "sm",
                }}
                isTruncated
                noOfLines={1}
                fontWeight="400"
                me="14px"
                maxWidth={"160px"}
              >
                {props.cargo}
              </Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
};
