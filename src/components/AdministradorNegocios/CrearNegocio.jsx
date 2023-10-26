import { useEffect, useState } from "react";
import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import InputTitle from "./Inputs/InputTitle";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import ManageProducts from "./ManageProducts";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import supabase from "../../api/client";

export default function CrearNegocio() {
  const contenedor = {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "10px",
    padding: "20px",
  };
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const productSubscription = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            setProducts([...products, payload.new]);
            break;
          case "DELETE":
            setProducts(
              products.filter((product) => product.id !== payload.old.id)
            );
            break;
          case "UPDATE":
            console.log(payload);
            break;
          // Agregar más casos según sea necesario
        }
      }
    )
    .subscribe();

  const categorySubscription = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "categories" },
      (payload) => {
        setCategories([...categories, payload.new.category]);
      }
    )
    .subscribe();

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    const fetchCategories = async () => {
      const categorylist = await getCategories("banca");
      setCategories(categorylist);
    };
    fetchProducts();
    fetchCategories();
  }, [productSubscription, categorySubscription]);

  return (
    <div style={contenedor}>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>
                <InputTitle></InputTitle>
                <ImageUploadButton></ImageUploadButton>
                <TextAreaDescription></TextAreaDescription>
                <InputLocation></InputLocation>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Horario">
            <ResponsiveTimePickers></ResponsiveTimePickers>
          </Tab>
          <Tab key="videos" title="Productos">
            <Card>
              <CardBody>
                <ManageProducts
                  products={products}
                  setProducts={setProducts}
                  categories={categories}
                  setCategories={setCategories}
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
