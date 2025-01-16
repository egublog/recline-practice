import { useState, useCallback, memo, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { TodoItemProps } from "@/types/todo";
const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = useCallback(() => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  }, [editText, todo.id, onEdit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleEditSubmit();
      }
    },
    [handleEditSubmit]
  );

  return (
    <Card className="group relative overflow-hidden p-4 mb-3 flex items-center justify-between hover:shadow-lg transition-all duration-300 ease-in-out border-l-4 border-l-blue-500 hover:border-l-blue-600 hover:translate-x-1 animate-scale bg-gradient-to-r from-white to-slate-50/80">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="transition-all duration-300 ease-in-out hover:scale-110 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditText(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              autoFocus
            />
            <Button
              onClick={handleEditSubmit}
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all duration-200 hover:shadow transform hover:scale-105"
            >
              保存
            </Button>
          </div>
        ) : (
          <span
            className={`flex-1 cursor-pointer px-2 py-1 rounded transition-all duration-300 ${
              todo.completed
                ? "line-through text-slate-400 opacity-50 scale-95"
                : "text-slate-700 group-hover:text-blue-600"
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center opacity-80 group-hover:opacity-100 transition-all duration-300">
        {!isEditing && (
          <>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="hover:bg-blue-50 shadow-sm transition-all duration-200 hover:shadow transform hover:scale-105"
            >
              編集
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              variant="destructive"
              size="sm"
              className="shadow-sm transition-all duration-200 hover:shadow transform hover:scale-105 hover:bg-red-600"
            >
              削除
            </Button>
          </>
        )}
      </div>
    </Card>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;
