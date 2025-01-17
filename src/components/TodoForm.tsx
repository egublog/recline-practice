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
  Text,
  useColorModeValue
} from "@chakra-ui/react";

interface TodoFormProps {
  onAdd: (text: string) => boolean;
}

export const TodoForm = forwardRef<HTMLInputElement, TodoFormProps>(({ onAdd }, ref) => {
  const [newTodo, setNewTodo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  // カラーモードに応じたスタイルの設定
  const cardBg = useColorModeValue("white", "gray.700");
  const inputBg = useColorModeValue("gray.50", "gray.600");
  const buttonScheme = useColorModeValue("teal", "purple");

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
      <Card
        mb={8}
        boxShadow="lg"
        _hover={{ boxShadow: "xl" }}
        bg={cardBg}
        sx={{
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)"
          }
        }}
      >
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
              _focus={{
                borderColor: `${buttonScheme}.500`,
                boxShadow: `0 0 0 1px var(--chakra-colors-${buttonScheme}-500)`
              }}
              bg={inputBg}
              size="lg"
            />
            <Button
              onClick={handleAddTodo}
              colorScheme={buttonScheme}
              bgGradient={`linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`}
              _hover={{
                bgGradient: `linear(to-r, ${buttonScheme}.500, ${buttonScheme}.700)`,
                transform: "scale(1.05)"
              }}
              size="lg"
              px={8}
            >
              追加
            </Button>
          </Box>
        </CardBody>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent>
          <ModalHeader
            bgGradient={`linear(to-r, ${buttonScheme}.400, ${buttonScheme}.600)`}
            color="white"
          >
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
              colorScheme={buttonScheme}
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
