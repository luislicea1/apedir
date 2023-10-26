import { useEffect, useState } from "react";
import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import InputTitle from "./Inputs/InputTitle";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import InputTelefonoLocalNumber from "./Inputs/InputTelefonoLocal";
import ManageProducts from "./ManageProducts";
import InputDeFaceBook from "./Inputs/InputDeFaceBook";
import InputDeInstagram from "./Inputs/InputDeInstagram";
import InputTelegram from "./Inputs/InputTelegram";
import InputWhatsapp from "./Inputs/InputWhatsapp";
import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
<<<<<<< HEAD
import supabase from "../../api/client";
=======
import InputPrecio from "./Inputs/InputPrecio";
>>>>>>> 0685ef12c8c8b538033abe50d397848d942052de

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


  const bg = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
    padding: "40px 0",
  };

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
                <div style={bg}>
                  <InputGmail></InputGmail>
                  <InputPhoneNumber></InputPhoneNumber>
                  <InputWhatsapp></InputWhatsapp>
                  <InputTelegram></InputTelegram>
                  <InputTelefonoLocalNumber></InputTelefonoLocalNumber>
                  <InputDeFaceBook></InputDeFaceBook>
                  <InputDeInstagram></InputDeInstagram>
                </div>
               
                
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
