import React, { useState, useEffect } from "react";
import ProductosHome from "./ProductosHome";
import { getAllProductsVipsFirst } from "../../api/products";
import { container, section } from "../styles/styles";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  HashNavigation,
  Grid,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";

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
        <TituloDeSeccion title = {"Productos Recomendados"}></TituloDeSeccion>
        <Swiper
          spaceBetween={30}
          // hashNavigation={{
          //   watchState: true,
          // }}
          // pagination={{
          //   clickable: true,
          // }}
          pagination={false}
          navigation={false}
          modules={[Pagination, Navigation, HashNavigation, Autoplay]}
          className="slider-negocios"
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            360: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            460: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            711: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            1020: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          loop={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <ProductosHome
                key={producto.id}
                image={producto.image}
                name={producto.name}
                price = {producto.price}
                currency = {producto.currency}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
