// import { Box, useStyleConfig} from '@chakra-ui/react';

import { CustomCardProps } from "@/theme/theme";
import { chakra, forwardRef, useStyleConfig } from "@chakra-ui/react";

const CustomCard = forwardRef<CustomCardProps, "div">((props, ref) => {
  const { size, variant, ...rest } = props;
  const styles = useStyleConfig("Card", { size, variant });

  return <chakra.div ref={ref} __css={styles} {...rest} />;
});

export default CustomCard;
