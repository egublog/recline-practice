import { VStack, Box, Text, Flex } from "@chakra-ui/react";
import { Todo } from "../../types/todo";
import TodoItem from "../TodoItem";
import { useStyles } from "./styles";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const styles = useStyles();

  return (
    <VStack gap={6} align="stretch" w="100%">
      {/* 未完了タスクセクション */}
      {pendingTodos.length > 0 && (
        <Box>
          <Box {...styles.sectionHeader}>
            <Flex justify="space-between" align="center">
              <Text {...styles.sectionTitle}>未完了のタスク</Text>
              <Text {...styles.countText}>{pendingTodos.length} 件</Text>
            </Flex>
          </Box>
          <VStack gap={3} align="stretch">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </VStack>
        </Box>
      )}

      {pendingTodos.length > 0 && completedTodos.length > 0 && (
        <Box divideX="2px" divideColor={styles.divider} />
      )}

      {/* 完了済みタスクセクション */}
      {completedTodos.length > 0 && (
        <Box>
          <Box {...styles.completedSectionHeader}>
            <Flex justify="space-between" align="center">
              <Text {...styles.completedSectionTitle}>完了済みのタスク</Text>
              <Text {...styles.countText}>{completedTodos.length} 件</Text>
            </Flex>
          </Box>
          <VStack gap={3} align="stretch">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </VStack>
        </Box>
      )}

      {todos.length === 0 && (
        <Box {...styles.emptyState}>
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </Box>
      )}
    </VStack>
  );
}
