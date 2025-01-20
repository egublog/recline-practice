import { Box, Container, VStack, Divider } from "@chakra-ui/react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { StatusBadges } from "./components/common/StatusBadges";
import { useTodos } from "./hooks/useTodos";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const { i18n } = useTranslation();
  const { bgGradient, buttonScheme } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(newLang);
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      display="flex"
      flexDirection="column"
    >
      <Header onLanguageToggle={toggleLanguage} />

      <Container maxW="2xl" flex={1} px={[4, 6]} pb={16}>
        <VStack spacing={8} align="stretch">
          <Box>
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
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
