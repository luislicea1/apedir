import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Imagen from "../../assets/fondo/restaurant.jpg";
import LogoImg from "../../assets/img/img (1).png";
import PortadaDeNegocio from "./PortadaDeNegocio/portadaNegocio";
import HeaderNegocio from "./HeaderNegocio/HeaderNegocio";
import DescripcionNegocio from "./Descripcion/Descripcion";
import TituloNegocio from "./TituloNegocio/TituloNegocio";
import ListadoProductos from "./Productos/ListadoProductos";
import Promo from "./Promo/Promo";
import { comidas } from "../Lugares/Comidas";
import { desayuno } from "../Lugares/Comidas";
import FooterNegocio from "./Footer/FooterNegocio";
import { NegocioSection } from "../styles/styles";
import Navegacion from "./HeaderNegocio/Navegacion";
import Stars from "../Stars/Stars";

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
    ]
    
  
    return (
      <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
        <section style={NegocioSection}>
          <HeaderNegocio
            logo={LogoImg}
            nombre={nombre}
            horario={"si"}
            anterior={"/"}
          ></HeaderNegocio>
          {isNavbarVisible && <Navegacion links={links} />}
  
  
          <section className="section" style={NegocioSection}>
            <PortadaDeNegocio imagenPortada={Imagen}></PortadaDeNegocio>
            <div className="p-2 m-2">
              <TituloNegocio title={nombre}></TituloNegocio>
              <Stars w = {150}></Stars>
              <DescripcionNegocio
                descripcion={text}
                contact={"si"}
                domicilio={"si"}
                localizacion={"si"}
                like={"si"}
              ></DescripcionNegocio>
  
              <Promo seguidores={300} productos={200} lesGusta={1200}></Promo>
              <div className="first-product-list"></div>
              <ListadoProductos
              id = "Desayuno"
                title="Desayuno"
                nombre={nombre}
                localizacion={localizacion}
                lista={desayuno}
              ></ListadoProductos>
              <ListadoProductos
              id="Comidas"
                title="Comidas"
                lista={comidas}
              ></ListadoProductos>
            </div>
          </section>
          <FooterNegocio title={nombre}></FooterNegocio>
        </section>
      </div>
    );
  }
  
  Negocio.propTypes = {
    nombre: PropTypes.string.isRequired,
    localizacion: PropTypes.string.isRequired,
  };
  