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

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // カラーモードに応じたスタイル
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const borderColor = useColorModeValue("teal.500", "purple.500");
  const buttonScheme = useColorModeValue("teal", "purple");
  const completedTextColor = useColorModeValue("gray.400", "gray.500");
  const hoverBg = useColorModeValue("gray.50", "gray.600");

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
      bg={cardBg}
      position="relative"
      overflow="hidden"
      sx={{
        transform: "translateX(0)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateX(4px)",
          boxShadow: "lg"
        }
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "4px",
        bgGradient: `linear(to-b, ${buttonScheme}.400, ${buttonScheme}.600)`
      }}
    >
      <CardBody>
        <Flex direction="column">
          <Flex alignItems="center" gap={3}>
            <Box position="relative">
              <Checkbox
                isChecked={todo.completed}
                onChange={() => onToggle(todo.id)}
                colorScheme={buttonScheme}
                sx={{
                  "& .chakra-checkbox__control": {
                    transition: "all 0.2s",
                    _hover: {
                      transform: "scale(1.1)",
                      bgGradient: `linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`
                    }
                  }
                }}
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
                  _focus={{
                    borderColor: `${buttonScheme}.500`,
                    boxShadow: `0 0 0 1px var(--chakra-colors-${buttonScheme}-500)`
                  }}
                  autoFocus
                  bg={useColorModeValue("white", "gray.800")}
                />
                <Button
                  onClick={handleEditSubmit}
                  size="sm"
                  bgGradient={`linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`}
                  color="white"
                  _hover={{
                    bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
                    transform: "scale(1.05)"
                  }}
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
                _hover={{ bg: hoverBg }}
              >
                <Text
                  color={todo.completed ? completedTextColor : textColor}
                  textDecoration={todo.completed ? "line-through" : "none"}
                  opacity={todo.completed ? 0.7 : 1}
                >
                  {todo.text}
                </Text>
              </Box>
            )}
          </Flex>

          {!isEditing && (
            <>
              <Divider my={2} borderColor={`${buttonScheme}.100`} />
              <Flex justify="flex-end" gap={2} mt={2}>
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="ghost"
                  color={`${buttonScheme}.500`}
                  _hover={{
                    bg: `${buttonScheme}.50`,
                    transform: "translateY(-1px)"
                  }}
                >
                  編集
                </Button>
                <Button
                  onClick={() => onDelete(todo.id)}
                  size="sm"
                  bgGradient="linear(to-r, red.400, pink.400)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, red.500, pink.500)",
                    transform: "translateY(-1px)"
                  }}
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
