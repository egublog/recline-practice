import { useState, useCallback, memo, ChangeEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Input,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Text,
  Flex,
} from "@chakra-ui/react";
import type { TodoItemProps } from "../../types/todo";
import { useStyles } from "./styles.ts";

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const styles = useStyles();
  const { t } = useTranslation();

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
                  {t("todo.save")}
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
                <Text sx={styles.todoText(todo.completed)}>{todo.text}</Text>
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
                  {t("todo.edit")}
                </Button>
                <Button
                  onClick={() => onDelete(todo.id)}
                  size="sm"
                  {...styles.deleteButton}
                >
                  {t("todo.delete")}
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
