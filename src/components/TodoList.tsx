import { VStack, Box, Text, Divider, useColorModeValue, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";

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
  
  const buttonScheme = useColorModeValue("teal", "purple");
  const headerBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const dividerColor = useColorModeValue(`${buttonScheme}.100`, `${buttonScheme}.700`);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <MotionVStack
      spacing={6}
      align="stretch"
      w="100%"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* 未完了タスクセクション */}
      {pendingTodos.length > 0 && (
        <MotionBox variants={listItem}>
          <Box
            mb={4}
            p={4}
            borderRadius="lg"
            bg={headerBg}
            boxShadow="sm"
            sx={{
              position: "relative",
              overflow: "hidden",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`
              }
            }}
          >
            <Flex justify="space-between" align="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                bgGradient={`linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`}
                bgClip="text"
              >
                未完了のタスク
              </Text>
              <Text fontSize="sm" color={textColor}>
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
        <Divider borderColor={dividerColor} />
      )}

      {/* 完了済みタスクセクション */}
      {completedTodos.length > 0 && (
        <MotionBox variants={listItem}>
          <Box
            mb={4}
            p={4}
            borderRadius="lg"
            bg={headerBg}
            boxShadow="sm"
            sx={{
              position: "relative",
              overflow: "hidden",
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                bgGradient: `linear(to-r, green.400, ${buttonScheme}.400)`
              }
            }}
          >
            <Flex justify="space-between" align="center">
              <Text
                fontSize="lg"
                fontWeight="bold"
                bgGradient={`linear(to-r, green.500, ${buttonScheme}.500)`}
                bgClip="text"
              >
                完了済みのタスク
              </Text>
              <Text fontSize="sm" color={textColor}>
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
          variants={listItem}
          p={8}
          textAlign="center"
          color={textColor}
          bg={headerBg}
          borderRadius="lg"
          boxShadow="sm"
        >
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </MotionBox>
      )}
    </MotionVStack>
  );
}
