import React, { useState, useEffect } from "react";
import ProductosHome from "./ProductosHome";
import { getAllProductsVipsFirst } from "../../api/products";
import { container, section } from "../styles/styles";

export default function ProductosSliderHome() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultados = await getAllProductsVipsFirst();
      setProductos(resultados);
    };
    fetchData();
  }, []);

  console.log(productos);

  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <div style={{display: "flex"}}>
            {productos.map((producto) => (
            <ProductosHome
                key={producto.id}
                image={producto.image}
                name={producto.name}
            />
            ))}
        </div>
        
      </section>
    </div>
  );
}
