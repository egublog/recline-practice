import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { COLORS, GRADIENTS } from "../constants/theme";

export const useTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgGradient = useColorModeValue(
    GRADIENTS.light.background,
    GRADIENTS.dark.background
  );

  const headerGradient = useColorModeValue(
    GRADIENTS.light.header,
    GRADIENTS.dark.header
  );

  const boxBg = useColorModeValue(
    COLORS.light.box,
    COLORS.dark.box
  );

  const textColor = useColorModeValue(
    COLORS.light.text,
    COLORS.dark.text
  );

  const buttonScheme = useColorModeValue(
    COLORS.light.button,
    COLORS.dark.button
  );

  return {
    colorMode,
    toggleColorMode,
    bgGradient,
    headerGradient,
    boxBg,
    textColor,
    buttonScheme,
  };
};