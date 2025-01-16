import { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TodoItem from "@/components/TodoItem";
import { useTodos } from "@/hooks/useTodos";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = useCallback(() => {
    if (addTodo(newTodo)) {
      setNewTodo("");
    }
  }, [newTodo, addTodo]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTodo();
      }
    },
    [handleAddTodo]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-fade-in drop-shadow-sm">
          Todoリスト
        </h1>

        <Card className="p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-none">
          <div className="flex gap-3 items-center animate-fade-in">
            <Input
              value={newTodo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTodo(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="新しいタスクを入力..."
              className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 border-slate-200 bg-white/50"
            />
            <Button
              onClick={handleAddTodo}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              追加
            </Button>
          </div>
        </Card>

        <div className="space-y-1 animate-fade-in">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
