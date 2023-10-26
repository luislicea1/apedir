import React from "react";

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
  Button,
} from "@nextui-org/react";
import { UploadIcon } from "../Icons/UploadIcon";
import { updateProduct } from "../../api/products";

export default function ModalEditProduct({
  isOpen,
  onOpen,
  onOpenChange,
  productInput,
  setProductInput,
  handleImageChange,
  imageName, 
  setImageName
}) {
  const handleEditProduct = async () => {
    
    await updateProduct(productInput, imageName);

  };

  return (
    <Modal
      isOpen={isOpen} // Usa el estado para controlar la apertura del modal
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar {productInput.name}
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Nombre"
                placeholder="Escribe el nombre del producto"
                variant="bordered"
                value={productInput.name}
                onChange={(event) =>
                  setProductInput({
                    ...productInput,
                    name: event.target.value,
                  })
                }
              />

              <Textarea
                autoFocus
                label="Descripción"
                placeholder="Escribe la descripción del producto"
                variant="bordered"
                value={productInput.description}
                onChange={(event) =>
                  setProductInput({
                    ...productInput,
                    description: event.target.value,
                  })
                }
              />
              <Input
                autoFocus
                label="Precio"
                placeholder="Precio del producto"
                variant="bordered"
                type="number"
                value={productInput.price}
                onChange={(event) =>
                  setProductInput({
                    ...productInput,
                    price: event.target.value,
                  })
                }
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <label style={{ fontSize: "0.75em" }}>
                  Selecciona una imagen.
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <label
                  style={{
                    backgroundColor: "#5E17EB",
                    padding: "5px 60px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <UploadIcon width={30} />
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="secondary"
                onPress={() => {
                  handleEditProduct();
                  onClose();
                }}
              >
                Editar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
