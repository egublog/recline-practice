import { VStack } from "@chakra-ui/react";
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

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <MotionVStack
      spacing={1}
      align="stretch"
      w="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </MotionVStack>
  );
}
