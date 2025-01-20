import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, SettingsIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

interface HeaderProps {
  onLanguageToggle: () => void;
}

export const Header = ({ onLanguageToggle }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const {
    colorMode,
    toggleColorMode,
    boxBg,
    headerGradient,
    buttonScheme
  } = useTheme();

  return (
    <Box
      py={4}
      mb={8}
      bg={boxBg}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="2xl">
        <Flex justify="space-between" align="center">
          <Heading
            as="h1"
            size={["lg", "xl"]}
            bgGradient={headerGradient}
            bgClip="text"
            fontWeight="bold"
          >
            {t('todo.title')}
          </Heading>
          <HStack spacing={2}>
            <Tooltip 
              label={t('todo.toggleLanguage', {
                lang: i18n.language === 'ja' ? '英語' : '日本語'
              })}
            >
              <IconButton
                aria-label={t('todo.toggleLanguage', {
                  lang: i18n.language === 'ja' ? '英語' : '日本語'
                })}
                icon={<SettingsIcon />}
                onClick={onLanguageToggle}
                variant="ghost"
                colorScheme={buttonScheme}
              />
            </Tooltip>
            <Tooltip 
              label={`${colorMode === 'light' 
                ? t('todo.darkMode') 
                : t('todo.lightMode')
              }`}
            >
              <IconButton
                aria-label={t('todo.toggleColorMode')}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                colorScheme={buttonScheme}
                sx={{
                  "&:hover": {
                    transform: "rotate(360deg)",
                    transition: "transform 0.6s ease-in-out"
                  }
                }}
              />
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};