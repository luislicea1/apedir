import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import CategoryContainer from "./CategoryContainer";
import { UploadIcon } from "../Icons/UploadIcon";
import "./addCategory.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  Textarea,
} from "@nextui-org/react";
import { CategoryIcon } from "../Icons/CategoryIcon";
import { addCategory, getCategories } from "../../api/categories";
import { addProduct } from "../../api/products";
import CustomDropdown from "./CustomDropdown";
import supabase from "../../api/client";
import { resizeImage } from "../../api/helpers/image";
import { uploadImage } from "../../api/images";
import ModalEditProduct from "./ModalEditProduct";

const ManageProducts = ({
  products,
  setProducts,
  categories,
  setCategories,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryInput, setCategoryInput] = useState("");
  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onOpenChange: onProductModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductEditOpen,
    onOpen: onProductEditOpen,
    onOpenChange: onProductEditOpenChange,
  } = useDisclosure();

  const [imageName, setImageName] = useState("");
  const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: categories[0],
    isAvalaible: true,
  });

  const handleAddCategory = async () => {
    const category = { bussiness: "banca", category: categoryInput };
    await addCategory(category);
    setCategoryInput("");
  };

  const handleAddProduct = async () => {
    // Añadiendo la imagen
    const insertedImage = await uploadImage(
      productInput.image,
      imageName,
      "products"
    );

    const updatedProductInput = {
      ...productInput,
      image: insertedImage.path,
    };

    await addProduct(updatedProductInput);
    setProductInput({
      name: "",
      price: "",
      description: "",
      image: "",
      category: categories[0],
      isAvalaible: true,
    });
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // Guarda el archivo en una variable
      // Obtiene la extensión del archivo
      const extension = file.name.split(".").pop();

      // Convierte la extensión a minúsculas
      const lowerCaseExtension = extension.toLowerCase();

      // Reemplaza la extensión original con la extensión en minúsculas
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      setImageName(newFileName);

      // Llama a la función resizeImage pasándole el archivo de imagen
      const resizedImage = await resizeImage(file); // Usa el archivo que guardaste

      // Usa el resultado de resizeImage para actualizar el estado del producto
      setProductInput((prevState) => {
        const updatedState = {
          ...prevState,
          image: resizedImage,
        };

        return updatedState;
      });
    }
  };

  // Recuperar los productos y las categorías

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <h3>Categorías </h3>
        <br />
      </section>

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category
        );
        return (
          <CategoryContainer
            category={category}
            products={categoryProducts}
            onOpen={onProductModalOpen}
            imageName={imageName}
            setImageName={setImageName}
            onProductEditOpen={onProductEditOpen}
            productInput={productInput}
            setProductInput={setProductInput}
            key={category}
          />
        );
      })}

      <label className="custum-file-upload" htmlFor="file">
        <div className="icon">
          <CategoryIcon onOpen={onOpen} />
        </div>
        <div className="text">
          <span>Agregar nueva categoría</span>

          {/* Agregar producto */}
          <Modal
            isOpen={isProductModalOpen} // Usa el estado para controlar la apertura del modal
            onOpenChange={onProductModalOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Agregar Producto a {productInput.category}
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
                        handleAddProduct();
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

          {/* Agregar Categoría  */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Agregar Categoría
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Nombre"
                      placeholder="Escribe el nombre de la categoría"
                      variant="bordered"
                      value={categoryInput}
                      onChange={(event) => setCategoryInput(event.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="secondary"
                      onPress={async () => {
                        await handleAddCategory();
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

          <ModalEditProduct
            isOpen={isProductEditOpen}
            onOpen={onProductEditOpen}
            onOpenChange={onProductEditOpenChange}
            productInput={productInput}
            setProductInput={setProductInput}
            handleImageChange={handleImageChange}
            imageName={imageName}
            setImageName={setImageName}
          />
        </div>
      </label>
    </div>
  );
};
export default ManageProducts;
