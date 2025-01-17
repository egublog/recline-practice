import { useState, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { Box, Input, Button, Card, CardBody } from "@chakra-ui/react";

interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = useCallback(() => {
    if (onAdd(newTodo)) {
      setNewTodo("");
    }
  }, [newTodo, onAdd]);

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
    <Card mb={8} boxShadow="lg" _hover={{ boxShadow: "xl" }}>
      <CardBody>
        <Box display="flex" gap={3} alignItems="center">
          <Input
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを入力..."
            flex={1}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px rgba(66, 153, 225, 0.5)"
            }}
            bg="white"
          />
          <Button
            onClick={handleAddTodo}
            bgGradient="linear(to-r, blue.500, purple.500)"
            _hover={{
              bgGradient: "linear(to-r, blue.600, purple.600)",
              transform: "scale(1.05)"
            }}
            color="white"
            boxShadow="md"
          >
            追加
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
}
