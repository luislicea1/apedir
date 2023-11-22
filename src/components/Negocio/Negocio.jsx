import React, { useState, useEffect, lazy, useRef } from "react";

import { useHref } from "react-router-dom";
import Header from "../header/Header";
import { NegocioSection } from "../styles/styles";
import Navegacion from "./HeaderNegocio/Navegacion";
import { fetchBussinessPerURL } from "../../api/bussiness";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import LoaderCompletePage from "../Loader/LoaderCompletePage";

const Stars = lazy(() => import("../Stars/Stars"));
const FooterNegocio = lazy(() => import("./Footer/FooterNegocio"));
const Promo = lazy(() => import("./Promo/Promo"));
const ListadoProductos = lazy(() => import("./Productos/ListadoProductos"));
const TituloNegocio = lazy(() => import("./TituloNegocio/TituloNegocio"));
const DescripcionNegocio = lazy(() => import("./Descripcion/Descripcion"));
const PortadaDeNegocio = lazy(() =>
  import("./PortadaDeNegocio/portadaNegocio")
);
export default function Negocio() {
  const history = useHref();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [bussiness, setBussiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const path = history.split("/");
    const fetchData = async () => {
      const bussinessData = await fetchBussinessPerURL(path[2]);
      setBussiness(bussinessData);
    };

    fetchData();
  }, [history]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (bussiness !== null && bussiness !== undefined && bussiness?.id) {
        const categoryList = await getCategories(bussiness.id);
        setCategories(categoryList);
      }
    };

    fetchCategories();
  }, [bussiness]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categories.length > 0) {
        const productList = await getProducts(categories, true);
        const nonEmptyCategories = categories.filter((category) =>
          productList.some((product) => product.category === category.id)
        );

        setCategories(nonEmptyCategories);
        setProducts(productList !== null ? productList : []);

        if (nonEmptyCategories.length > 0) setIsNavbarVisible(true);
      }
    };

    fetchProducts();
  }, [categories]);

  useEffect(() => {
    const checkScrollPosition = () => {
      const firstProductList = document.querySelector(".first-product-list");
      if (firstProductList) {
        const firstProductListPosition =
          firstProductList.getBoundingClientRect().top;
        if (window.pageYOffset >= firstProductListPosition) {
          setIsNavbarVisible(true);
        } else {
          setIsNavbarVisible(false);
        }
      }
    };

    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (product) => {
    setCarrito(product);
  };

  return bussiness !== null ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={NegocioSection}>
        {/* <Header
          logo={bussiness.perfil_pic}
          nombre={bussiness.name}
          horario={"si"}
          anterior={"/"}
          carrito={carrito}
        /> */}
        {isNavbarVisible && <Navegacion links={categories} />}
        <section className="section" style={NegocioSection}>
          <PortadaDeNegocio
            imagenPortada={bussiness.front_pic}
          ></PortadaDeNegocio>
          <div className="p-2 m-2">
            <div>
              <TituloNegocio title={bussiness.name}></TituloNegocio>
              <Stars w={100}></Stars>
              <DescripcionNegocio
                descripcion={bussiness.description}
                contact={"si"}
                domicilio={"si"}
                localizacion={bussiness.address}
                gps_location={bussiness.gps_location}
                like={"si"}
              ></DescripcionNegocio>

              <Promo seguidores={300} productos={200} lesGusta={1200}></Promo>
            </div>

            <div className="first-product-list"></div>
            <div>
              {categories.map((category, idx) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id
                );
                return (
                  categoryProducts.length > 0 && (
                    <ListadoProductos
                      id={idx}
                      key={idx}
                      title={category.category}
                      nombre={category.category}
                      localizacion={category.category}
                      lista={categoryProducts}
                      onChangeCarrito={handleAddToCart}
                    ></ListadoProductos>
                  )
                );
              })}
            </div>
          </div>
        </section>
        <div>
          <FooterNegocio
            title={bussiness.name}
            imagen={bussiness.perfil_pic}
            url={history}
          ></FooterNegocio>
        </div>
      </section>
    </div>
  ) : (
    <LoaderCompletePage />
  );
}
