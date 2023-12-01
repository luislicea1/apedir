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
import ModalEditProduct from "./Modals/ModalEditProduct";
import ModalDeleteProduct from "./Modals/ModalDeleteProduct";
import ModalDeleteCategory from "./Modals/ModalDeleteCategory";
import ModalEditCategory from "./Modals/ModalEditCategory";
import { Toaster, toast } from "sonner";
import InputPrecio from "./Inputs/InputPrecio";
import ProductInputSchema from "../../schemas/productInputSchema";
import { getCategories } from "../../api/categories";
import {
  useBussinessStore,
  useCategoriesList,
  useProductsList,
  useUserStore,
} from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";

export default function ManageProducts() {
  const user = useUserStore((state) => state.user);

  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const categoriesGlobal = useCategoriesList((state) => state.categories);
  const setCategoriesGlobal = useCategoriesList((state) => state.setCategories);
  const productsGlobal = useProductsList((state) => state.products);
  const setProductsGlobal = useProductsList((state) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(
    productsGlobal !== null ? productsGlobal : []
  );
  const [categories, setCategories] = useState(
    categoriesGlobal !== null ? categoriesGlobal : []
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fetchBussiness = async () => {
    if (user === null) return;

    const b = await getOneBussiness(user.id);
    setBussiness(b);
    setCategoryInput((prev) => {
      const newCat = {
        ...prev,
        bussiness: b.id,
      };
      return newCat;
    });
  };

  useEffect(() => {
    if (bussiness === null) fetchBussiness();
  }, [user, bussiness]);

  const [categoryInput, setCategoryInput] = useState({
    bussiness: "",
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
    currency: "CUP",
    description: "",
    image: "",
    category: "",
    isAvalaible: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const fetchCategories = async () => {
    if (bussiness === null) return;
    const categorylist = await getCategories(bussiness.id);
    setCategories(categorylist !== null ? categorylist : []);
    setCategoriesGlobal(categorylist);
  };

  useEffect(() => {
    fetchCategories();
  }, [bussiness]);

  const fetchProducts = async () => {
    const productList = await getProducts(categories);
    setProducts(productList !== null ? productList : []);
    setProductsGlobal(productList);
  };

  useEffect(() => {
    if (categories.length < 1) return;
    fetchProducts();
  }, [categories]);

  useEffect(() => {
    validateForm();
  }, [productInput]);
  // Recuperar los productos y las categorías

  const validateForm = async () => {
    try {
      await ProductInputSchema.validate(productInput);
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  const handleAddCategory = async () => {
    if (categoryInput.category.trim() === "") {
      toast.error("El nombre de la categoría no puede estar vacío");
      return;
    }

    await addCategory(categoryInput);

    setCategoryInput({
      bussiness: bussiness.id,
      category: "",
    });
    await fetchCategories();
  };

  const handleAddProduct = async () => {
    // Añadiendo la imagen

    if (!isFormValid) {
      toast.error(
        await ProductInputSchema.validate().catch((error) => error.message)
      );

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
      price: 1,
      currency: "CUP",
      description: "",
      image: "",
      category: "",
      isAvalaible: true,
    });
    await fetchProducts();
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setLoading(true);
      const file = event.target.files[0]; // Guarda el archivo en una variable

      // Obtiene la extensión del archivo
      const extension = file.name.split(".").pop();

      // Convierte la extensión a minúsculas
      const lowerCaseExtension = extension.toLowerCase();

      // Reemplaza la extensión original con la extensión en minúsculas
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      setImageName(newFileName);

      // Llama a la función resizeImage pasándole el archivo de imagen
      const resizedImage = await resizeImage(file, 500, 500); // Usa el archivo que guardaste

      // Usa el resultado de resizeImage para actualizar el estado del producto
      setProductInput((prevState) => {
        const updatedState = {
          ...prevState,
          image: resizedImage,
        };

        return updatedState;
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <section style={{ marginTop: "10px" }}>
        <h3>Categorías </h3>
        <br />
      </section>
      <Toaster richColors duration={3000} theme="dark" position="top-center" />

      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category === category.id
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
                      maxLength={120}
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
                    <p>{productInput.description.length} / 120</p>

                    <InputPrecio
                      value={productInput}
                      setValues={setProductInput}
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
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                        </div>
                      </label>
                      {loading && <p>Subiendo imagen...</p>}
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
                          bussiness: bussiness.id,
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
            fetchProducts={fetchProducts}
          />

          <ModalEditCategory
            fetchCategories={fetchCategories}
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
            fetchProducts={fetchProducts}
          />
          <ModalDeleteCategory
            isOpen={isCategoryDeleteOpen}
            categoryToDelete={categoryInput}
            onOpen={onCategoryDeleteOpen}
            fetchCategories={fetchCategories}
            onOpenChange={onCategoryDeleteOpenChange}
          />
        </div>
      </label>
    </div>
  );
}
