import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  memo,
} from "react";

import Header from "../header/Header";
import { NegocioSection } from "../styles/styles";
import Navegacion from "./HeaderNegocio/Navegacion";
import { fetchBussinessPerURL } from "../../api/bussiness";
import { getCategories } from "../../api/categories";
import { getProducts } from "../../api/products";
import LoaderCompletePage from "../Loader/LoaderCompletePage";

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";

const Stars = lazy(() => import("../Stars/Stars"));
const FooterNegocio = lazy(() => import("./Footer/FooterNegocio"));
const Promo = lazy(() => import("./Promo/Promo"));
const ListadoProductos = lazy(() => import("./Productos/ListadoProductos"));
const TituloNegocio = lazy(() => import("./TituloNegocio/TituloNegocio"));
const DescripcionNegocio = lazy(() => import("./Descripcion/Descripcion"));
const PortadaDeNegocio = lazy(() =>
  import("./PortadaDeNegocio/portadaNegocio")
);

const renderLoader = () => <p>Loading</p>;

export default memo(function Negocio({ url }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const [bussiness, setBussiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const bussinessData = await fetchBussinessPerURL(url);
    setBussiness(bussinessData);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getCategories(bussiness.id);
      setCategories(categoryList);
    };
    if (bussiness !== null && bussiness !== undefined && bussiness?.id)
      fetchCategories();
    if (categories.length > 0) setIsNavbarVisible(true);
  }, [bussiness]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts(categories);
      setProducts(productList !== null ? productList : []);
    };
    if (categories.length > 0) fetchProducts();
  }, [categories]);

  useEffect(() => {
    const checkScrollPosition = () => {
      const firstProductListPosition = document
        .querySelector(".first-product-list")
        .getBoundingClientRect().top;
      if (window.pageYOffset >= firstProductListPosition) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
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

  console.log(carrito);

  return bussiness ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={NegocioSection}>
        <Header
          logo={bussiness.perfil_pic}
          nombre={bussiness.name}
          horario={"si"}
          anterior={"/"}
          carrito={carrito}
        />
        {isNavbarVisible && <Navegacion links={categories} />}
        <section className="section" style={NegocioSection}>
          <PortadaDeNegocio
            imagenPortada={bussiness.front_pic}
          ></PortadaDeNegocio>
          <div className="p-2 m-2">
            <Suspense fallback={renderLoader()}>
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
            </Suspense>

            <div className="first-product-list"></div>
            <Suspense fallback={renderLoader()}>
              {categories.map((category, idx) => {
                const categoryProducts = products.filter(
                  (product) => product.category === category.id
                );
                return (
                  <ListadoProductos
                    id={idx}
                    key={idx}
                    title={category.category}
                    nombre={category.category}
                    localizacion={category.category}
                    lista={categoryProducts}
                    onChangeCarrito={handleAddToCart}
                  ></ListadoProductos>
                );
              })}
            </Suspense>
          </div>
        </section>
        <Suspense fallback={renderLoader()}>
          <FooterNegocio
            title={"nombre"}
            imagen={bussiness.perfil_pic}
            url={url}
          ></FooterNegocio>
        </Suspense>
      </section>
    </div>
  ) : (
    <LoaderCompletePage />
  );
});
