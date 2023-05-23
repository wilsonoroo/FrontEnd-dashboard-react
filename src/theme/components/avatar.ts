import { avatarAnatomy as parts } from "@chakra-ui/anatomy";
import {
    createMultiStyleConfigHelpers,
    defineStyle
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid"
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: 'gray.400',
      color: 'gray.900',
    }
  }
})

// Defining a custom variant
const variantRoundedSquare = definePartsStyle({
  badge: {
    bg: "gray.500",
    border: "2px solid"
  },
  container: {
    borderRadius: "0.7em",
  },
  excessLabel: {
    bg: "gray.800",
    color: "white",
    borderRadius: "0.7em",
    border: "2px solid",

    // let's also provide dark mode alternatives
    _dark: {
      bg: "gray.400",
      color: "gray.900"
    }
  }
});

const variants = {
  roundedSquare: variantRoundedSquare,
}

const superLg = defineStyle({
  width: 40,
  height: 40,
  fontSize: "6xl",
  borderWidth: "6px"
})

const sizes = {
  superLg: definePartsStyle({
    container: superLg,
    excessLabel: superLg,
    badge: {
      width: 8,
      height: 8,
      borderWidth: "6px",
    }
  }),
}

export const avatarTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
})