import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  memo,
  useMemo,
} from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import { getOneBussiness } from "../../api/bussiness";
import { useBussinessStore, useUserStore } from "../../hooks/useStore";
import supabase from "../../api/client";
import { grid_1_col } from "../styles/styles";
const ResponsiveTimePickers = lazy(() =>
  import("./Inputs/ResponsiveTimePicker")
);
const NegocioDashboard = memo(lazy(() => import("./NegocioDashboard")));
const EventManagement = lazy(() => import("./EventManagement"));
const ManageProducts = lazy(() => import("./ManageProducts"));

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

  useEffect(() => {
    if (categories.length === 0) return;

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
  }, [categories]);

  const renderLoader = () => <p>Loading</p>;

  const memoizedNegocioDashboard = useMemo(
    () => <NegocioDashboard user={user} bussiness={bussiness} />,
    [user, JSON.stringify(bussiness)]
  );

  const memoizedResponsiveTimePickers = useMemo(
    () => <ResponsiveTimePickers />,
    []
  );

  const memoizedEventManagement = useMemo(
    () => <EventManagement bussinessId={bussiness?.id} />,
    [bussiness]
  );

  const memoizedManageProducts = useMemo(
    () => (
      <ManageProducts
        products={products}
        setProducts={setProducts}
        categories={categories}
        setCategories={setCategories}
        bussiness={bussiness}
      />
    ),
    [products, setProducts, categories, setCategories, bussiness]
  );

  return (
    <div style={grid_1_col}>
      <div className="flex w-full flex-col">
        <br />
        <Tabs fullWidth>
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>{memoizedNegocioDashboard}</CardBody>
            </Card>
          </Tab>
          <Tab key="horario" title="Horario">
            <Suspense fallback={renderLoader()}>
              {memoizedResponsiveTimePickers}
            </Suspense>
          </Tab>
          <Tab key="eventos" title="Eventos">
            <Card>
              <CardBody>{memoizedEventManagement}</CardBody>
            </Card>
          </Tab>
          <Tab key="productos" title="Productos">
            <Card>
              <CardBody>{memoizedManageProducts}</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
