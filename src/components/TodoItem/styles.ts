import { useAppTheme } from "../../contexts/ThemeContext";

export const useStyles = () => {
  const { mode, buttonScheme, textColor } = useAppTheme();
  const cardBg = mode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(45, 55, 72, 0.9)";
  const completedTextColor = mode === "light" ? "gray.400" : "gray.500";
  const hoverBg = mode === "light" ? "rgba(247, 250, 252, 0.9)" : "rgba(45, 55, 72, 0.8)";
  const inputBg = mode === "light" ? "white" : "gray.800";
  const borderColor = mode === "light" ? "gray.200" : "gray.600";

  return {
    card: {
      mb: 3,
      boxShadow: "lg",
      bg: cardBg,
      border: "1px solid",
      borderColor: borderColor,
      backdropFilter: "blur(8px)",
      sx: {
        position: "relative",
        overflow: "hidden",
        transform: "translateX(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateX(4px) translateY(-2px)",
          boxShadow: "xl",
          borderColor: `${buttonScheme}.200`,
        },
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "4px",
          bgGradient: `linear(to-b, ${buttonScheme}.400, ${buttonScheme}.600)`,
        },
      },
    },

    checkbox: {
      colorScheme: buttonScheme,
      sx: {
        "& .chakra-checkbox__control": {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "2px solid",
          borderColor: `${buttonScheme}.400`,
          _hover: {
            transform: "scale(1.1)",
            bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
            boxShadow: `0 0 10px var(--chakra-colors-${buttonScheme}-200)`,
          },
        },
        "& .chakra-checkbox__label": {
          transition: "all 0.3s ease",
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

    saveButton: {
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      color: "white",
      _hover: {
        bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
        transform: "scale(1.05)",
      },
    },

    textBox: {
      _hover: { bg: hoverBg },
    },

    todoText: (completed: boolean) => ({
      color: completed ? completedTextColor : textColor,
      textDecoration: completed ? "line-through" : "none",
      opacity: completed ? 0.7 : 1,
      transition: "all 0.3s ease",
      position: "relative",
      _after: completed ? {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        height: "1px",
        bg: completedTextColor,
        transform: "scaleX(1)",
        transition: "transform 0.3s ease",
      } : {},
    }),

    divider: {
      my: 2,
      borderColor: `${buttonScheme}.100`,
    },

    editButton: {
      variant: "ghost",
      color: `${buttonScheme}.500`,
      transition: "all 0.3s ease",
      _hover: {
        bg: `${buttonScheme}.50`,
        transform: "translateY(-2px)",
        boxShadow: `0 4px 12px var(--chakra-colors-${buttonScheme}-100)`,
      },
    },

    deleteButton: {
      bgGradient: "linear(to-r, red.400, pink.400)",
      color: "white",
      transition: "all 0.3s ease",
      _hover: {
        bgGradient: "linear(to-r, red.500, pink.500)",
        transform: "translateY(-2px) scale(1.05)",
        boxShadow: "0 4px 12px rgba(229, 62, 62, 0.3)",
      },
    },
  };
};
