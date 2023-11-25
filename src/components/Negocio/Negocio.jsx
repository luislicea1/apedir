import React, { useState, useEffect, lazy, useRef } from "react";

import { Link, useHref } from "react-router-dom";
import { NegocioSection } from "../styles/styles";
import Navegacion from "./HeaderNegocio/Navegacion";
import { fetchBussinessPerURL } from "../../api/bussiness";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import LoaderCompletePage from "../Loader/LoaderCompletePage";
import { useUserStore } from "../../hooks/useStore";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

import Stars from "../Stars/Stars";
import {
  getProfileStars,
  getProfileStarsFromBussiness,
} from "../../api/profile";
// const Stars = lazy(() => import("../Stars/Stars"));
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
  const [bussiness, setBussiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastViewedTitle, setLastViewedTitle] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [userStars, setUserStars] = useState(0);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (lastViewedTitle !== null) {
      //alert(lastViewedTitle);
    }
  }, [lastViewedTitle]);

  const [ref, inView] = useInView({
    triggerOnce: false, // Esto hace que el observador se desconecte una vez que el div entra en el viewport
  });

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

    const fetchStars = async () => {
      const stars = await getProfileStarsFromBussiness(user.id, bussiness.id);

      setUserStars(stars);
    };
    fetchCategories();
    if (user !== null && bussiness !== null && bussiness !== undefined) {
      fetchStars();
    }
  }, [bussiness, user]);

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

  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (product) => {
    setCarrito(product);
  };

  const changeTitle = (title) => {
    setLastViewedTitle(title);
    //alert(title)
    //props.onChangeTitle(title);
  };

  return bussiness !== null ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <Helmet>
        <meta name="description" content={bussiness.description} />
        <title>{bussiness.name}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={bussiness.perfil_pic}
          alt="logo"
        />
      </Helmet>

      <section style={NegocioSection}>
        {inView && (
          <Navegacion
            links={categories}
            lastViewedTitle={lastViewedTitle}
          ></Navegacion>
        )}

        <section className="section" style={NegocioSection}>
          <PortadaDeNegocio
            imagenPortada={bussiness.front_pic}
          ></PortadaDeNegocio>
          <div className="p-2 m-2">
            <div style={{ height: "50vh" }}>
              <TituloNegocio title={bussiness.name}></TituloNegocio>
              {user !== null ? (
                <Stars
                  rate={userStars}
                  setRate={setUserStars}
                  w={100}
                  user={user.id}
                  bussiness={bussiness.id}
                />
              ) : (
                <Link to="/login">
                  <Stars
                    readOnly
                    w={100}
                  />
                </Link>
              )}

              <DescripcionNegocio
                descripcion={bussiness.description}
                contact={"si"}
                domicilio={"si"}
                localizacion={bussiness.address}
                gps_location={bussiness.gps_location}
                like={"si"}
                url={history}
              ></DescripcionNegocio>

              <Promo seguidores={300} productos={200} lesGusta={1200}></Promo>
            </div>

            <div ref={ref}>
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
                      onChangeTitle={changeTitle}
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
