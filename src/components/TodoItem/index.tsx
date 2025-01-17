import { useState, useCallback, memo, ChangeEvent, KeyboardEvent } from "react";
import {
  Box,
  Input,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  useColorModeValue,
  Text,
  Flex
} from "@chakra-ui/react";
import type { TodoItemProps } from "@/types/todo";
import { useStyles } from "./styles";

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const styles = useStyles();

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
      } else if (e.key === "Escape") {
        setIsEditing(false);
        setEditText(todo.text);
      }
    },
    [handleEditSubmit, todo.text]
  );

  return (
    <Card {...styles.card}>
      <CardBody>
        <Flex direction="column">
          <Flex alignItems="center" gap={3}>
            <Box position="relative">
              <Checkbox
                isChecked={todo.completed}
                onChange={() => onToggle(todo.id)}
                {...styles.checkbox}
              />
            </Box>
            
            {isEditing ? (
              <Flex alignItems="center" gap={2} flex={1}>
                <Input
                  value={editText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditText(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  {...styles.input}
                  autoFocus
                />
                <Button
                  onClick={handleEditSubmit}
                  size="sm"
                  {...styles.saveButton}
                >
                  保存
                </Button>
              </Flex>
            ) : (
              <Box
                flex={1}
                cursor="pointer"
                px={3}
                py={2}
                borderRadius="md"
                transition="all 0.3s"
                onClick={() => setIsEditing(true)}
                {...styles.textBox}
              >
                <Text {...styles.todoText(todo.completed)}>
                  {todo.text}
                </Text>
              </Box>
            )}
          </Flex>

          {!isEditing && (
            <>
              <Divider {...styles.divider} />
              <Flex justify="flex-end" gap={2} mt={2}>
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  {...styles.editButton}
                >
                  編集
                </Button>
                <Button
                  onClick={() => onDelete(todo.id)}
                  size="sm"
                  {...styles.deleteButton}
                >
                  削除
                </Button>
              </Flex>
            </>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;