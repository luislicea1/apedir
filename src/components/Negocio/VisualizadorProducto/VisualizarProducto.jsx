import React from "react";
import HeaderNegocio from "../HeaderNegocio/HeaderNegocio";
import LogoImg from "../../../assets/img/img (1).webp";
import { useState, useEffect } from "react";
import Imagen from "../../../assets/img/img (3).jpg";
//import Imagen from "../../../assets/comidas/comida (5).png";
import ImagenVisualizador from "./ImagenVisualizador";
import "./visualizarProducto.css";
import DescripcionDeP from "./DescripcionDeP";
import PromoProducto from "./PromoProducto";
import OrdenarProducto from "./OrdenarProducto";

const sectionStyle = {
  width: "100%",
  maxWidth: "450px",
  display: "flex",
  height: "calc(100vh - 64px)",
  flexDirection: "column",
  background: "linear-gradient(#0B1D1D,#0F0D13)",
  position: "relative",
};
const sectionStyle2 = {
  width: "100%",
  maxWidth: "450px",
  height: "100vh",
  background: "#0F0D13",
};

const sectionDescription = {
  width: "100%",
  padding: "20px",
  position: "absolute",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
};
const marginTop = {
  //marginTop: "60px"
};

const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iuret.";

export default function VisualizarProducto({ nombre, title, localizacion }) {
  const top = {
    top: "300px",
    background: "red",
  };
  const [cantidad, setCantidad] = useState(0);

  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (product) => {
    setCarrito((prevCarrito) => [
      ...prevCarrito,
      { title: product.title, quantity: product.quantity, image: Imagen },
    ]);
  };

  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <div style={sectionStyle2}>
        <section style={sectionStyle}>
          <HeaderNegocio
            logo={LogoImg}
            nombre={nombre}
            horario={"si"}
            anterior={`/lugar/${localizacion}/${nombre}`}
            carrito={carrito}
          ></HeaderNegocio>

          <section style={marginTop}>
            <ImagenVisualizador image={Imagen}></ImagenVisualizador>
            <div style={sectionDescription}>
              <DescripcionDeP
                title={title}
                text={text}
                onAddToCart={handleAddToCart}
                cantidad={cantidad}
              ></DescripcionDeP>
              <OrdenarProducto onChangeQuantity={setCantidad}></OrdenarProducto>

              <PromoProducto></PromoProducto>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
