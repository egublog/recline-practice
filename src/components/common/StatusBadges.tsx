import { Flex, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

interface StatusBadgesProps {
  totalCount: number;
  completedCount: number;
  pendingCount: number;
}

export const StatusBadges = ({
  totalCount,
  completedCount,
  pendingCount
}: StatusBadgesProps) => {
  const { t } = useTranslation();
  const { buttonScheme } = useTheme();

  return (
    <Flex justify="center" gap={4} mb={6}>
      <Badge
        px={3}
        py={1}
        borderRadius="full"
        colorScheme={buttonScheme}
        variant="subtle"
      >
        {t('todo.allTasks', { count: totalCount })}
      </Badge>
      <Badge
        px={3}
        py={1}
        borderRadius="full"
        colorScheme="green"
        variant="subtle"
      >
        {t('todo.completed', { count: completedCount })}
      </Badge>
      <Badge
        px={3}
        py={1}
        borderRadius="full"
        colorScheme="blue"
        variant="subtle"
      >
        {t('todo.remaining', { count: pendingCount })}
      </Badge>
    </Flex>
  );
};