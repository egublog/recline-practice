import { useState, useCallback } from "react";
import type { Todo } from "../types/todo";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (trimmedText) {
      setTodos((prev) => [
        {
          id: Date.now(),
          text: trimmedText,
          completed: false,
        },
        ...prev,
      ]);
      return true;
    }
    return false;
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: number, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return false;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo))
    );
    return true;
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };
}
