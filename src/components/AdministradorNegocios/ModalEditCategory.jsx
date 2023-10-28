import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { updateCategory } from "../../api/categories";

export default function ModalEditCategory({
  isOpen,
  onOpenChange,
  categoryInput,
  setCategoryInput,
}) {
  const handleUpdateCategory = async () => {
    await updateCategory(categoryInput);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Categoría {categoryInput.category}
              </ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  label="Nombre"
                  placeholder="Escribe el nombre de la categoría"
                  variant="bordered"
                  value={categoryInput.category}
                  onChange={(event) =>
                    setCategoryInput((prevState) => {
                      const updatedState = {
                        ...prevState,
                        category: event.target.value,
                      };
                      return updatedState;
                    })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="secondary"
                  onPress={() => {
                    handleUpdateCategory();
                    onClose();
                  }}
                >
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
