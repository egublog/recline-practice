import { Box, Container, VStack, Divider } from "@chakra-ui/react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StatusBadges } from "./components/common/StatusBadges";
import { useTodoContext } from "./contexts/TodoContext";
import { useI18n } from "./contexts/I18nContext";
import { useAppTheme } from "./contexts/ThemeContext";

function TodoContainer() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    completedTodos,
    pendingTodos,
  } = useTodoContext();
  const { buttonScheme, textColor, boxBg } = useAppTheme();

  return (
    <VStack spacing={8} align="stretch">
      <Box bg={boxBg} p={4} borderRadius="md" color={textColor}>
        <StatusBadges
          totalCount={todos.length}
          completedCount={completedTodos.length}
          pendingCount={pendingTodos.length}
        />
        <TodoForm onAdd={addTodo} />
      </Box>

      <Divider borderColor={`${buttonScheme}.100`} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </VStack>
  );
}

function App() {
  const { toggleLanguage } = useI18n();
  const { bgGradient, toggleTheme } = useAppTheme();

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Header onLanguageToggle={toggleLanguage} onThemeToggle={toggleTheme} />

      <Container maxW="2xl" flex={1} px={[4, 6]} pb={16}>
        <TodoContainer />
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
