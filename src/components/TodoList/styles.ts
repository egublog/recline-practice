import { useAppTheme } from "../../contexts/ThemeContext";

export const useStyles = () => {
  const { mode, buttonScheme, boxBg, textColor } = useAppTheme();
  const dividerColor =
    mode === "light" ? `${buttonScheme}.100` : `${buttonScheme}.700`;

  const borderColor = mode === "light" ? "gray.200" : "gray.600";
  const baseHeader = {
    mb: 4,
    p: 4,
    borderRadius: "lg",
    bg: boxBg,
    boxShadow: "lg",
    border: "1px solid",
    borderColor: borderColor,
    backdropFilter: "blur(8px)",
    sx: {
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "xl",
        borderColor: `${buttonScheme}.200`,
      },
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        transition: "opacity 0.3s ease",
      },
    },
  };

  return {
    sectionHeader: {
      ...baseHeader,
      sx: {
        ...baseHeader.sx,
        _before: {
          ...baseHeader.sx._before,
          bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`,
        },
      },
    },

    completedSectionHeader: {
      ...baseHeader,
      sx: {
        ...baseHeader.sx,
        _before: {
          ...baseHeader.sx._before,
          bgGradient: `linear(to-r, green.400, ${buttonScheme}.400)`,
        },
      },
    },

    sectionTitle: {
      fontSize: "lg",
      fontWeight: "bold",
      bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
      bgClip: "text",
      letterSpacing: "wide",
      transition: "all 0.3s ease",
      _hover: {
        transform: "translateX(4px)",
        letterSpacing: "wider",
      },
    },

    completedSectionTitle: {
      fontSize: "lg",
      fontWeight: "bold",
      bgGradient: `linear(to-r, green.500, ${buttonScheme}.500)`,
      bgClip: "text",
      letterSpacing: "wide",
      transition: "all 0.3s ease",
      _hover: {
        transform: "translateX(4px)",
        letterSpacing: "wider",
      },
    },

    countText: {
      fontSize: "sm",
      color: textColor,
      fontWeight: "medium",
      transition: "all 0.3s ease",
      _hover: {
        transform: "scale(1.05)",
        color: `${buttonScheme}.500`,
      },
    },

    divider: {
      borderColor: dividerColor,
      transition: "all 0.3s ease",
      _hover: {
        borderColor: `${buttonScheme}.200`,
      },
    },

    emptyState: {
      p: 8,
      textAlign: "center",
      color: textColor,
      bg: boxBg,
      borderRadius: "lg",
      boxShadow: "lg",
      border: "1px solid",
      borderColor: borderColor,
      backdropFilter: "blur(8px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "xl",
        borderColor: `${buttonScheme}.200`,
      },
    },
  };
};
