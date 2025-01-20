import { Box, Container, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

export const Footer = () => {
  const { t } = useTranslation();
  const { boxBg, textColor, buttonScheme } = useTheme();

  return (
    <Box
      as="footer"
      py={4}
      bg={boxBg}
      borderTopWidth="1px"
      borderColor={`${buttonScheme}.100`}
    >
      <Container maxW="2xl" textAlign="center">
        <Text fontSize="sm" color={textColor}>
          {t('todo.footer', { year: new Date().getFullYear() })}
        </Text>
      </Container>
    </Box>
  );
};