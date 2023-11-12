import React, { useEffect, useState } from "react";
import ManageProducts from "./ManageProducts";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

//import ResponsiveTimePickers from "./Inputs/ResponsiveTimePicker";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import { getOneBussiness } from "../../api/bussiness";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import supabase from "../../api/client";
import { grid_1_col } from "../styles/styles";
import NegocioDashboard from "./NegocioDashboard";
import EventManagement from "./EventManagement";

export default function CrearNegocio() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;
    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };
  useEffect(() => {
    fetchBussiness();
  }, [user]);

  // useEffect para las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      if (bussiness === null) return;
      const categorylist = await getCategories(bussiness.id);
      setCategories(categorylist !== null ? categorylist : []);
    };

    let categorySubscription = null;

    const timer = setTimeout(
      () => (categorySubscription = subscribeToCategories()),
      1000
    );

    const subscribeToCategories = () => {
      return supabase
        .channel("category-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "categories" },
          () => {
            fetchCategories();
          }
        )
        .subscribe();
    };

    fetchCategories();

    return () => {
      if (categorySubscription) categorySubscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [bussiness]);

  // useEffect para los productos
  useEffect(() => {
    if (categories.length === 0) return; // No intentes cargar los productos si las categorías aún no se han cargado

    const fetchProducts = async () => {
      const productList = await getProducts(categories);
      setProducts(productList !== null ? productList : []);
    };

    let productSubscription = null;

    const timer = setTimeout(
      () => (productSubscription = subscribeToProducts()),
      1000
    );

    const subscribeToProducts = () => {
      return supabase
        .channel("products-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "products" },
          () => {
            fetchProducts();
          }
        )
        .subscribe();
    };

    fetchProducts();

    return () => {
      if (productSubscription) productSubscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [categories]); // Este useEffect se activa cuando las categorías cambian

  return (
    <div style={grid_1_col}>
      <div className="flex w-full flex-col">
        <br />
        <Tabs fullWidth>
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>
                <NegocioDashboard user={user} bussiness={bussiness} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="horario" title="Horario">
            {/* <ResponsiveTimePickers></ResponsiveTimePickers> */}
          </Tab>
          <Tab key="eventos" title="Eventos">
            <Card>
              <CardBody>
                <EventManagement />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="productos" title="Productos">
            <Card>
              <CardBody>
                <ManageProducts
                  products={products}
                  setProducts={setProducts}
                  categories={categories}
                  setCategories={setCategories}
                  bussiness={bussiness}
                />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
