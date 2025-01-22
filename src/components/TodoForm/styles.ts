import { useAppTheme } from "../../contexts/ThemeContext";

export const useStyles = () => {
  const { mode, buttonScheme } = useAppTheme();
  const cardBg = mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(45, 55, 72, 0.9)";
  const inputBg = mode === "light" ? "rgba(247, 250, 252, 0.9)" : "rgba(45, 55, 72, 0.8)";
  const borderColor = mode === "light" ? "gray.200" : "gray.600";

  return {
    card: {
      mb: 8,
      boxShadow: "xl",
      bg: cardBg,
      border: "1px solid",
      borderColor: borderColor,
      backdropFilter: "blur(12px)",
      sx: {
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "2xl",
          borderColor: `${buttonScheme}.200`,
        },
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover::before": {
          opacity: 1,
        },
      },
    },

    input: {
      bg: inputBg,
      border: "2px solid",
      borderColor: "transparent",
      transition: "all 0.3s ease",
      _placeholder: {
        color: mode === "light" ? "gray.400" : "gray.500",
      },
      _hover: {
        borderColor: `${buttonScheme}.200`,
      },
      _focus: {
        borderColor: `${buttonScheme}.500`,
        boxShadow: `0 0 0 1px var(--chakra-colors-${buttonScheme}-500)`,
        transform: "translateY(-1px)",
      },
    },

    addButton: {
      colorScheme: buttonScheme,
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      boxShadow: "md",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: {
        bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
        transform: "translateY(-2px) scale(1.05)",
        boxShadow: `0 4px 12px var(--chakra-colors-${buttonScheme}-200)`,
      },
      _active: {
        transform: "translateY(0) scale(0.95)",
      },
    },

    modalOverlay: {
      bg: "blackAlpha.300",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
    },

    modalHeader: {
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      color: "white",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid",
      borderColor: `${buttonScheme}.300`,
    },

    confirmButton: {
      colorScheme: buttonScheme,
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      transition: "all 0.3s ease",
      _hover: {
        bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
        transform: "translateY(-2px)",
        boxShadow: `0 4px 12px var(--chakra-colors-${buttonScheme}-200)`,
      },
      _active: {
        transform: "translateY(0)",
      },
    },
  };
};
