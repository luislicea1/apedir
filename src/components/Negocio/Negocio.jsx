import PropTypes from "prop-types";
import Imagen from "../../assets/fondo/restaurant.jpg";
import LogoImg from "../../assets/img/img (1).png";
import PortadaDeNegocio from "./PortadaDeNegocio/portadaNegocio";
import Logo from "./Logo/Logo";
import HeaderNegocio from "./HeaderNegocio/HeaderNegocio";
import DescripcionNegocio from "./Descripcion/Descripcion";
import TituloNegocio from "./TituloNegocio/TituloNegocio";
import ListadoProductos from "./Productos/ListadoProductos";
import React, { useState, useEffect } from "react";
import Promo from "./Promo/Promo";
import Contact from "./Contact/Contact";
import { comidas } from "../Lugares/Comidas";
import { desayuno } from "../Lugares/Comidas";

const sectionStyle = {
  width: "100%",
  maxWidth: "735px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};
const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";

export default function Negocio({ nombre, localizacion }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

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

  const top = {
    top: "300px",
    background: "red"
  }

  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={sectionStyle}>
        <HeaderNegocio logo={LogoImg} nombre={nombre}></HeaderNegocio>
        
        <section className="section" style={sectionStyle}>
          <PortadaDeNegocio imagenPortada={Imagen}></PortadaDeNegocio>
          <div className="p-2 m-2">
            <TituloNegocio title={nombre}></TituloNegocio>
            <DescripcionNegocio descripcion={text}></DescripcionNegocio>

            <Promo seguidores={300} productos={200} lesGusta={1200}></Promo>
            <div className="first-product-list"></div>
            <ListadoProductos
              title="Desayuno"
              lista={desayuno}
            ></ListadoProductos>
            <ListadoProductos
              title="Comidas"
              lista={comidas}
            ></ListadoProductos>
            <Contact title="Contactenos"></Contact>
          </div>
        </section>
      </section>
    </div>
  );
}

Negocio.propTypes = {
  nombre: PropTypes.string.isRequired,
  localizacion: PropTypes.string.isRequired,
};
