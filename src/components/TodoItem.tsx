import { useState, useCallback, memo, ChangeEvent, KeyboardEvent } from "react";
import { Box, Input, Button, Card, CardBody, Checkbox } from "@chakra-ui/react";
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
    <Card
      mb={3}
      boxShadow="base"
      _hover={{ boxShadow: "lg", transform: "translateX(2px)" }}
      transition="all 0.3s"
      borderLeftWidth="4px"
      borderLeftColor="blue.500"
      bg="white"
      position="relative"
      overflow="hidden"
    >
      <CardBody>
        <Box display="flex" alignItems="center" gap={3}>
          <Box position="relative">
            <Checkbox
              isChecked={todo.completed}
              onChange={() => onToggle(todo.id)}
              colorScheme="green"
              _hover={{ transform: "scale(1.1)" }}
              transition="transform 0.3s"
            />
          </Box>
          {isEditing ? (
            <Box display="flex" alignItems="center" gap={2} flex={1}>
              <Input
                value={editText}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditText(e.target.value)
                }
                onKeyDown={handleKeyDown}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.5)"
                }}
                autoFocus
              />
              <Button
                onClick={handleEditSubmit}
                size="sm"
                colorScheme="green"
                _hover={{ transform: "scale(1.05)" }}
              >
                保存
              </Button>
            </Box>
          ) : (
            <Box
              flex={1}
              cursor="pointer"
              px={2}
              py={1}
              borderRadius="md"
              transition="all 0.3s"
              textDecoration={todo.completed ? "line-through" : "none"}
              opacity={todo.completed ? 0.5 : 1}
              color={todo.completed ? "gray.400" : "gray.700"}
              _hover={{ color: "blue.600" }}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </Box>
          )}
          {!isEditing && (
            <Box display="flex" gap={2}>
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="outline"
                _hover={{ bg: "blue.50" }}
              >
                編集
              </Button>
              <Button
                onClick={() => onDelete(todo.id)}
                size="sm"
                colorScheme="red"
                _hover={{ bg: "red.600" }}
              >
                削除
              </Button>
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;
