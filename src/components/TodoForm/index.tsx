import { useState, useCallback, ChangeEvent, KeyboardEvent, forwardRef, useRef } from "react";
import {
  Box,
  Input,
  Button,
  Card,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Text
} from "@chakra-ui/react";
import { useStyles } from "./styles";

interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export const TodoForm = forwardRef<HTMLInputElement, TodoFormProps>(({ onAdd }, ref) => {
  const [newTodo, setNewTodo] = useState("");
  const { open, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const styles = useStyles();

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim()) {
      onOpen();
    }
  }, [newTodo, onOpen]);

  const confirmAdd = useCallback(() => {
    if (onAdd(newTodo)) {
      setNewTodo("");
      onClose();
    }
  }, [newTodo, onAdd, onClose]);

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
      <Card {...styles.card}>
        <CardBody>
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
        </CardBody>
      </Card>

      <Modal
        isOpen={open}
        onClose={onClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay {...styles.modalOverlay} />
        <ModalContent>
          <ModalHeader {...styles.modalHeader}>
            タスクの追加
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pt={6}>
            <Text>以下のタスクを追加しますか？</Text>
            <Divider my={4} />
            <Text fontWeight="bold" fontSize="lg">
              {newTodo}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              ref={initialRef}
              {...styles.confirmButton}
              onClick={confirmAdd}
            >
              追加する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

TodoForm.displayName = "TodoForm";