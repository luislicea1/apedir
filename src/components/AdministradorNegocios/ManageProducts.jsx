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
import { addCategory } from "../../api/categories";
import { addProduct } from "../../api/products";
import { resizeImage } from "../../api/helpers/image";
import { uploadImage } from "../../api/images";
import ModalEditProduct from "./ModalEditProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalDeleteCategory from "./ModalDeleteCategory";
import ModalEditCategory from "./ModalEditCategory";
import { Toaster, toast } from "sonner";

const ManageProducts = ({
  products,
  setProducts,
  categories,
  setCategories,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryInput, setCategoryInput] = useState({
    bussiness: "banca",
    category: "",
  });
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

  const {
    isOpen: isCategoryEditOpen,
    onOpen: onCategoryEditOpen,
    onOpenChange: onCategoryEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isProductDeleteOpen,
    onOpen: onProductDeleteOpen,
    onOpenChange: onProductDeleteOpenChange,
  } = useDisclosure();

  const {
    isOpen: isCategoryDeleteOpen,
    onOpen: onCategoryDeleteOpen,
    onOpenChange: onCategoryDeleteOpenChange,
  } = useDisclosure();

  const [imageName, setImageName] = useState("");
  const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    isAvalaible: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = async () => {
    if (
      productInput.name.trim() !== "" &&
      productInput.description.trim() !== "" &&
      productInput.price.trim() !== ""
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const [isCategoryFormValid, setIsCategoryFormValid] = useState(false);

  const validateCategoryAdd = async () => {
    if (categoryInput.category.trim() !== "") {
      setIsCategoryFormValid(true);
    } else {
      setIsCategoryFormValid(false);
    }
  };

  const handleAddCategory = async () => {
    if (categoryInput.category.trim() === "") {
      toast.error("El nombre de la categoría no puede estar vacío");
      return;
    }
    console.log(categoryInput);

    await addCategory(categoryInput);

    setCategoryInput({
      bussiness: "banca",
      category: "",
    });
  };

  const handleAddProduct = async () => {
    // Añadiendo la imagen
    console.log(productInput);
    await validateCategoryAdd();
    if (!isCategoryFormValid) {
      toast.error("Debes rellenar todos los campos del formulario");
      return;
    }
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
      category: "",
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

  useEffect(() => {
    validateForm();
  }, [productInput]);
  // Recuperar los productos y las categorías

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <h3>Categorías </h3>
        <br />
      </section>
      <Toaster richColors duration={3000} theme="dark" position="top-center" />
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category.category
        );
        return (
          <CategoryContainer
            category={category}
            products={categoryProducts}
            onOpen={onProductModalOpen}
            imageName={imageName}
            setImageName={setImageName}
            onCategoryEditOpen={onCategoryEditOpen}
            onCategoryEditOpenChange={onCategoryEditOpenChange}
            onCategoryDeleteOpen={onCategoryDeleteOpen}
            onProductEditOpen={onProductEditOpen}
            onProductDeleteOpen={onProductDeleteOpen}
            productInput={productInput}
            setProductInput={setProductInput}
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
            key={category.id}
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
                      style={{ color: "white" }}
                      onPress={() => {
                        handleAddProduct();
                        onClose();
                      }}
                      disabled={!isFormValid}
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
                      isRequired
                      placeholder="Escribe el nombre de la categoría"
                      variant="bordered"
                      value={categoryInput.category}
                      onChange={(event) =>
                        setCategoryInput((prevState) => ({
                          ...prevState,
                          category: event.target.value,
                        }))
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
                        handleAddCategory();
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
            setCategoryInput={setCategoryInput}
            handleImageChange={handleImageChange}
            imageName={imageName}
            setImageName={setImageName}
          />

          <ModalEditCategory
            isOpen={isCategoryEditOpen}
            onOpenChange={onCategoryEditOpenChange}
            categoryInput={categoryInput}
            setCategoryInput={setCategoryInput}
          />

          <ModalDeleteProduct
            isOpen={isProductDeleteOpen}
            onOpen={onProductDeleteOpen}
            onOpenChange={onProductDeleteOpenChange}
            productToDelete={productInput}
          />
          <ModalDeleteCategory
            isOpen={isCategoryDeleteOpen}
            categoryToDelete={categoryInput}
            onOpen={onCategoryDeleteOpen}
            onOpenChange={onCategoryDeleteOpenChange}
          />
        </div>
      </label>
    </div>
  );
};
export default ManageProducts;
