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


  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };
    let productSubscription = null;
    let categorySubscription = null;

    const timer1 = setTimeout(
      () => (productSubscription = subscribeToProducts()),
      1000
    );
    const timer2 = setTimeout(
      () => (categorySubscription = subscribeToCategories()),
      1000
    );

    const subscribeToProducts = () => {
      return supabase
        .channel("products-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "products" },
          (payload) => {
            fetchProducts();
          }
        )
        .subscribe();
    };

    const subscribeToCategories = () => {
      return supabase
        .channel("category-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "categories" },
          (payload) => {
            fetchCategories();
          }
        )
        .subscribe();
    };
    const fetchCategories = async () => {
      const categorylist = await getCategories("banca");
      setCategories(categorylist);
    };
    fetchProducts();
    fetchCategories();

    return () => {
      if (productSubscription) productSubscription.unsubscribe();
      if (categorySubscription) categorySubscription.unsubscribe();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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
