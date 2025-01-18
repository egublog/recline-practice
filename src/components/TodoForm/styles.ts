import { useColorModeValue } from "../ui/color-mode";

export const useStyles = () => {
  const buttonScheme = useColorModeValue("teal", "purple");
  const cardBg = useColorModeValue("white", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.600");

  return {
    card: {
      mb: 8,
      boxShadow: "lg",
      _hover: { boxShadow: "xl" },
      bg: cardBg,
      sx: {
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      },
    },

    input: {
      _focus: {
        borderColor: `${buttonScheme}.500`,
        boxShadow: `0 0 0 1px var(--chakra-colors-${buttonScheme}-500)`,
      },
      bg: inputBg,
    },

    addButton: {
      colorScheme: buttonScheme,
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      _hover: {
        bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
        transform: "scale(1.05)",
      },
    },

    modalOverlay: {
      bg: "blackAlpha.300",
      backdropFilter: "blur(10px)",
    },

    dialogHeader: {
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      color: "white",
    },

    confirmButton: {
      colorScheme: buttonScheme,
    },
  };
};
