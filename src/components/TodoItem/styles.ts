import { useColorModeValue } from "@chakra-ui/react";

export const useStyles = () => {
  const buttonScheme = useColorModeValue("teal", "purple");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("teal.500", "purple.500");
  const completedTextColor = useColorModeValue("gray.400", "gray.500");
  const hoverBg = useColorModeValue("gray.50", "gray.600");

  return {
    card: {
      mb: 3,
      boxShadow: "base",
      bg: cardBg,
      position: "relative",
      overflow: "hidden",
      sx: {
        transform: "translateX(0)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: "lg"
        },
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "4px",
          bgGradient: `linear(to-b, ${buttonScheme}.400, ${buttonScheme}.600)`
        }
      }
    },

    checkbox: {
      colorScheme: buttonScheme,
      sx: {
        "& .chakra-checkbox__control": {
          transition: "all 0.2s",
          _hover: {
            transform: "scale(1.1)",
            bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`
          }
        }
      }
    },

    input: {
      _focus: {
        borderColor: `${buttonScheme}.500`,
        boxShadow: `0 0 0 1px var(--chakra-colors-${buttonScheme}-500)`
      },
      bg: useColorModeValue("white", "gray.800")
    },

    saveButton: {
      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
      color: "white",
      _hover: {
        bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
        transform: "scale(1.05)"
      }
    },

    textBox: {
      _hover: { bg: hoverBg }
    },

    todoText: (completed: boolean) => ({
      color: completed ? completedTextColor : textColor,
      textDecoration: completed ? "line-through" : "none",
      opacity: completed ? 0.7 : 1
    }),

    divider: {
      my: 2,
      borderColor: `${buttonScheme}.100`
    },

    editButton: {
      variant: "ghost",
      color: `${buttonScheme}.500`,
      _hover: {
        bg: `${buttonScheme}.50`,
        transform: "translateY(-1px)"
      }
    },

    deleteButton: {
      bgGradient: "linear(to-r, red.400, pink.400)",
      color: "white",
      _hover: {
        bgGradient: "linear(to-r, red.500, pink.500)",
        transform: "translateY(-1px)"
      }
    }
  };
};