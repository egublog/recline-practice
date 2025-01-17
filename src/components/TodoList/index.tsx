import { VStack, Box, Text, Divider, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import { useStyles } from "./styles";
import { listAnimations } from "./animations";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const MotionVStack = motion(VStack);
const MotionBox = motion(Box);

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);
  const styles = useStyles();
  
  return (
    <MotionVStack
      spacing={6}
      align="stretch"
      w="100%"
      initial="hidden"
      animate="show"
      variants={listAnimations.container}
    >
      {/* 未完了タスクセクション */}
      {pendingTodos.length > 0 && (
        <MotionBox variants={listAnimations.listItem}>
          <Box {...styles.sectionHeader}>
            <Flex justify="space-between" align="center">
              <Text {...styles.sectionTitle}>
                未完了のタスク
              </Text>
              <Text {...styles.countText}>
                {pendingTodos.length} 件
              </Text>
            </Flex>
          </Box>
          <VStack spacing={3} align="stretch">
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
        </MotionBox>
      )}

      {pendingTodos.length > 0 && completedTodos.length > 0 && (
        <Divider {...styles.divider} />
      )}

      {/* 完了済みタスクセクション */}
      {completedTodos.length > 0 && (
        <MotionBox variants={listAnimations.listItem}>
          <Box {...styles.completedSectionHeader}>
            <Flex justify="space-between" align="center">
              <Text {...styles.completedSectionTitle}>
                完了済みのタスク
              </Text>
              <Text {...styles.countText}>
                {completedTodos.length} 件
              </Text>
            </Flex>
          </Box>
          <VStack spacing={3} align="stretch">
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
        </MotionBox>
      )}

      {todos.length === 0 && (
        <MotionBox
          variants={listAnimations.listItem}
          {...styles.emptyState}
        >
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </MotionBox>
      )}
    </MotionVStack>
  );
}