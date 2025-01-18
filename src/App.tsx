import {
  Box,
  Container,
  Heading,
  IconButton,
  VStack,
  Text,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { Sun, Moon } from "lucide-react";
import { Tooltip } from "./components/ui/tooltip";
import { useColorMode, useColorModeValue } from "./components/ui/color-mode";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const { colorMode, toggleColorMode } = useColorMode();

  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, teal.50, blue.50)",
    "linear(to-br, gray.900, purple.900, gray.900)"
  );

  const headerGradient = useColorModeValue(
    "linear(to-r, teal.600, blue.600)",
    "linear(to-r, purple.500, pink.500)"
  );

  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const buttonScheme = useColorModeValue("teal", "purple");

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      display="flex"
      flexDirection="column"
    >
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
              Todoリスト
            </Heading>
            <Tooltip
              content={`${colorMode === "light" ? "ダーク" : "ライト"}モードに切り替え`}
            >
              <IconButton
                aria-label="カラーモード切り替え"
                onClick={toggleColorMode}
                variant="ghost"
                colorScheme={buttonScheme}
              >
                {colorMode === "light" ? <Moon /> : <Sun />}
              </IconButton>
            </Tooltip>
          </Flex>
        </Container>
      </Box>

      <Container maxW="2xl" flex={1} px={[4, 6]} pb={16}>
        <VStack gap={8} align="stretch">
          <Box>
            <Flex justify="center" gap={4} mb={6}>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme={buttonScheme}
                variant="subtle"
              >
                全てのタスク: {todos.length}
              </Badge>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme="green"
                variant="subtle"
              >
                完了: {completedTodos.length}
              </Badge>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme="blue"
                variant="subtle"
              >
                未完了: {pendingTodos.length}
              </Badge>
            </Flex>
            <TodoForm onAdd={addTodo} />
          </Box>

          <Box divideX="2px" divideColor={`${buttonScheme}.100`} />

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </VStack>
      </Container>

      <Box
        as="footer"
        py={4}
        bg={boxBg}
        borderTopWidth="1px"
        borderColor={`${buttonScheme}.100`}
      >
        <Container maxW="2xl" textAlign="center">
          <Text fontSize="sm" color={textColor}>
            © 2024 Todoリスト - Powered by Chakra UI
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
