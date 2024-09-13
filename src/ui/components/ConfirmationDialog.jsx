import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

// Hook personalizado para manejar el diálogo de confirmación
function useConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return { isOpen, openDialog, closeDialog };
}

// Componente de confirmación reutilizable
function ConfirmationDialog({ isOpen, onClose, onConfirm, title, message }) {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={onConfirm} ml={3}>
              Aceptar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

ConfirmationDialog.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onConfirm: () => {},
  title: "",
  message: "",
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
};

export { useConfirmationDialog, ConfirmationDialog };
