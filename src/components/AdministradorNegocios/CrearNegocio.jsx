import { useEffect, useState } from "react";
import ManageProducts from "./ManageProducts";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import supabase from "../../api/client";
import { grid_1_col } from "../styles/styles";
import NegocioDashboard from "./NegocioDashboard";

export default function CrearNegocio() {
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList !== null ? productList : []);
    };

    const fetchCategories = async () => {
      const categorylist = await getCategories("banca");
      setCategories(categorylist !== null ? categorylist : []);
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

    fetchProducts();
    fetchCategories();

    return () => {
      if (productSubscription) productSubscription.unsubscribe();
      if (categorySubscription) categorySubscription.unsubscribe();
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div style={grid_1_col}>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="perfil" title="Perfil">
            <NegocioDashboard />
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
