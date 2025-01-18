import {
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  forwardRef,
  useRef,
} from "react";
import {
  Box,
  Input,
  Button,
  Card,
  DialogRoot,
  DialogBackdrop,
  DialogActionTrigger,
  DialogContent,
  DialogBody,
  Text,
  DialogHeader,
  DialogFooter,
} from "@chakra-ui/react";
import { useStyles } from "./styles";

interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export const TodoForm = forwardRef<HTMLInputElement, TodoFormProps>(
  ({ onAdd }, ref) => {
    const [newTodo, setNewTodo] = useState("");
    const [open, setOpen] = useState(false);
    const initialRef = useRef(null);
    const styles = useStyles();

    const handleAddTodo = useCallback(() => {
      if (newTodo.trim()) {
        setOpen(true);
      }
    }, [newTodo, setOpen]);

    const confirmAdd = useCallback(() => {
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
      <>
        <Card.Root {...styles.card}>
          <Card.Body>
            <Box display="flex" gap={3} alignItems="center">
              <Input
                ref={ref}
                value={newTodo}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewTodo(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="新しいタスクを入力..."
                flex={1}
                {...styles.input}
                size="lg"
              />
              <Button
                onClick={handleAddTodo}
                {...styles.addButton}
                size="lg"
                px={8}
              >
                追加
              </Button>
            </Box>
          </Card.Body>
        </Card.Root>

        <DialogRoot
          open={open}
          initialFocusEl={() => initialRef.current}
          placement="center"
          onOpenChange={(e) => setOpen(e.open)}
        >
          <DialogBackdrop {...styles.modalOverlay} />
          <DialogContent>
            <DialogHeader {...styles.dialogHeader}>タスクの追加</DialogHeader>
            <DialogBody pt={6}>
              <Text>以下のタスクを追加しますか？</Text>
              <Text fontWeight="bold" fontSize="lg">
                {newTodo}
              </Text>
            </DialogBody>

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="ghost" mr={3}>
                  キャンセル
                </Button>
              </DialogActionTrigger>
              <Button
                ref={initialRef}
                {...styles.confirmButton}
                onClick={confirmAdd}
              >
                追加する
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </>
    );
  }
);

TodoForm.displayName = "TodoForm";
