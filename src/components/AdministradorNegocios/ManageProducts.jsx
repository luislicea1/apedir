import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import CategoryContainer from "./CategoryContainer";
import {UploadIcon} from "../Icons/UploadIcon";
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
import CustomDropdown from "./CustomDropdown";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoryInput, setCategoryInput] = useState("");
  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onOpenChange: onProductModalOpenChange,
  } = useDisclosure();

  const [productInput, setProductInput] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    isAvalaible: false,
  });

  const handleAddCategory = async () => {
    const category = { bussiness: "banca", category: categoryInput };
    await addCategory(category);
    setCategoryInput("");
    onOpenChange(false);
  };
  const handleAddProduct = async () => {
    console.log(productInput);
  };

  // Recuperar los productos y las categorías
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);

      //   const uniqueCategories = [
      //     ...new Set(productList.map((product) => product.category)),
      //   ];
      //   setCategories(uniqueCategories);
    };
    const fetchCategories = async () => {
      const categorylist = await getCategories("banca");
      setCategories(categorylist);
    };
    fetchProducts();
    fetchCategories();
  }, []);

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
                    Agregar Producto
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
                        Selecciona la categoría
                      </label>
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
                      <CustomDropdown
                        status={categories[0]}
                        items={categories}
                      />

                      <label
                        style={{ backgroundColor: "#5E17EB", padding: "5px 60px", borderRadius: "10px" }}
                      >
                        <div >
                          <UploadIcon width={30} />
                          <input type="file" style={{ display: "none" }} />
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
        </div>
      </label>
    </div>
  );
};
export default ManageProducts;
