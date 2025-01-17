import { Box, Container, Heading } from "@chakra-ui/react";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, blue.50, purple.50)"
      p={[6, 8]}
    >
      <Container maxW="2xl">
        <Heading
          as="h1"
          size="xl"
          mb={8}
          textAlign="center"
          bgGradient="linear(to-r, blue.600, purple.600)"
          bgClip="text"
          fontWeight="bold"
        >
          Todoリスト
        </Heading>

        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </Container>
    </Box>
  );
}

export default App;
