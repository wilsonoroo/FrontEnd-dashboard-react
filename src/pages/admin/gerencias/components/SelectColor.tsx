import {
  Button,
  Center,
  chakra,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";

import { useState } from "react";

export interface ISelectColorsProps {
  value: string;
}

const ChakraNextImage = chakra(PopoverTrigger);
// interface PopoverTriggerProps {
//   children: React.ReactChild;
// }

// export const PopoverTrigger: React.FC<
//   PropsWithChildren<PopoverTriggerProps>
// > = (props) => {
//   // enforce a single child
//   const child: any = Children.only(props.children);
//   const { getTriggerProps } = usePopoverContext();
//   return React.cloneElement(child, getTriggerProps(child.props, child.ref));
// };
export default function SelectColors(props: ISelectColorsProps) {
  const [color, setColor] = useState("gray.500");
  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500",
  ];
  return (
    <>
      <Center marginTop={5}>
        <Popover variant="picker">
          <ChakraNextImage>
            <Button aria-label={color} background={color}>
              Trigger
            </Button>
          </ChakraNextImage>
          <PopoverContent>
            <PopoverArrow bg={color} />
            <PopoverCloseButton color="white" />
            <PopoverHeader
              height="100px"
              backgroundColor={color}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
              color="white"
            >
              <Center height="100%">{color}</Center>
            </PopoverHeader>
            <PopoverBody height="120px">
              <SimpleGrid columns={5} spacing={2}>
                {colors.map((c) => (
                  <Button
                    key={c}
                    aria-label={c}
                    background={c}
                    height="22px"
                    width="22px"
                    padding={0}
                    minWidth="unset"
                    borderRadius={3}
                    _hover={{ background: c }}
                    onClick={() => {
                      setColor(c);
                    }}
                  ></Button>
                ))}
              </SimpleGrid>
              <Input
                borderRadius={3}
                marginTop={3}
                placeholder="red.100"
                size="sm"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Center>
    </>
  );
}
