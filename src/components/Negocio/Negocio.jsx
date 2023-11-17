import React, { useState, useEffect, lazy, Suspense } from "react";

import PropTypes from "prop-types";
import Imagen from "../../assets/fondo/restaurant.webp";
import LogoImg from "../../assets/img/img (1).webp";
import Header from "../header/Header";
//import PortadaDeNegocio from "./PortadaDeNegocio/portadaNegocio";
//import HeaderNegocio from "./HeaderNegocio/HeaderNegocio";
//import DescripcionNegocio from "./Descripcion/Descripcion";
//import TituloNegocio from "./TituloNegocio/TituloNegocio";
//import ListadoProductos from "./Productos/ListadoProductos";
//import Promo from "./Promo/Promo";
import { comidas } from "../Lugares/Comidas";
import { desayuno } from "../Lugares/Comidas";
//import FooterNegocio from "./Footer/FooterNegocio";
import { NegocioSection } from "../styles/styles";
import Navegacion from "./HeaderNegocio/Navegacion";
//import Stars from "../Stars/Stars";
import { Helmet } from "react-helmet";
import { fetchBussinessPerURL } from "../../api/bussiness";

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";

const Stars = lazy(() => import("../Stars/Stars"));
//const Navegacion = lazy(() => import("./HeaderNegocio/Navegacion"));
const FooterNegocio = lazy(() => import("./Footer/FooterNegocio"));
const Promo = lazy(() => import("./Promo/Promo"));
const ListadoProductos = lazy(() => import("./Productos/ListadoProductos"));
const TituloNegocio = lazy(() => import("./TituloNegocio/TituloNegocio"));
const DescripcionNegocio = lazy(() => import("./Descripcion/Descripcion"));
const PortadaDeNegocio = lazy(() => import("./PortadaDeNegocio/portadaNegocio"));

const renderLoader = () => <p>Loading</p>;

export default function Negocio({ url}) {
  
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const [bussiness, setBussiness] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const bussinessData = await fetchBussinessPerURL(url);
      setBussiness(bussinessData);
    };
 
    fetchData();
  }, [url]);
 

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

  const links = [
    {
      nombre: "Desayuno",
    },
    {
      nombre: "Almuerzo",
    },
    {
      nombre: "Comidas",
    },
    {
      nombre: "Pizza",
    },
    {
      nombre: "Postres",
    },
    {
      nombre: "Desayuno",
    },
    {
      nombre: "Almuerzo",
    },
    {
      nombre: "Comida",
    },
    {
      nombre: "Pizza",
    },
    {
      nombre: "Postres",
    },
  ];

  return (

    bussiness ? (
      <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      {/* <Helmet>
        <meta
          name="description"
          content="pagina de promocion de negocios en cuba"
        />
        <title>{nombre}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={LogoImg}
          alt="logo apedir"
        />dame 
      </Helmet> */}
        <section style={NegocioSection}>
          <Header
            logo={bussiness.perfil_pic}
            nombre={bussiness.name}
            horario={"si"}
            anterior={"/"}
          />

        {isNavbarVisible && <Navegacion links={links} />}

        <section className="section" style={NegocioSection}>
          <PortadaDeNegocio imagenPortada={bussiness.front_pic}></PortadaDeNegocio>
          <div className="p-2 m-2">
            <Suspense fallback={renderLoader()}>
              <TituloNegocio title={bussiness.name}></TituloNegocio>
              <Stars w={100}></Stars>
              <DescripcionNegocio
                descripcion={bussiness.description}
                contact={"si"}
                domicilio={"si"}
                localizacion={"si"}
                like={"si"}
              ></DescripcionNegocio>

              <Promo seguidores={300} productos={200} lesGusta={1200}></Promo>
            </Suspense>

            <div className="first-product-list"></div>
            <Suspense fallback={renderLoader()}>
              <ListadoProductos
                id="Desayuno"
                title="Desayuno"
                nombre={"nombre"}
                localizacion={"localizacion"}
                lista={desayuno}
              ></ListadoProductos>
              <ListadoProductos
                id="Comidas"
                title="Comidas"
                lista={comidas}
              ></ListadoProductos>
            </Suspense>
          </div>
        </section>
        <Suspense fallback={renderLoader()}>
          <FooterNegocio title={"nombre"}></FooterNegocio>
        </Suspense>
      </section>
    </div>
    ):(
      <>loading</>
    )
  );
}

Negocio.propTypes = {
  //nombre: PropTypes.string.isRequired,
  //localizacion: PropTypes.string.isRequired,
};
