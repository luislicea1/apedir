import React from "react";
import ProductosHome from "./ProductosHome";
import { container, section } from "../styles/styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import { useProductsHome } from "../../hooks/useStore";
import SkeletonProductosHome from "../Skeleton/SkeletonProductoHome";

export default function ProductosSliderHome() {
  const productos = useProductsHome((state) => state.products);

  return (
    <div
      id={"productos-recomendado"}
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <TituloDeSeccion title={"Productos Recomendados"}></TituloDeSeccion>
        <Swiper
          spaceBetween={30}
          modules={[Autoplay]}
          className="slider-negocios"
          breakpoints={{
            280: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            360: {
              slidesPerView: 1.5,
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
          {productos?.length > 0 ? (
            productos.map((producto) => (
              <SwiperSlide key={producto.id}>
                <ProductosHome
                  key={producto.id}
                  image={producto.image}
                  name={producto.name}
                  price={producto.price}
                  currency={producto.currency}
                  url={producto.url}
                />
              </SwiperSlide>
            ))
          ) : (
            <>
              <SwiperSlide>
                <SkeletonProductosHome />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonProductosHome />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonProductosHome />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonProductosHome />
              </SwiperSlide>
              <SwiperSlide>
                <SkeletonProductosHome />
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </section>
    </div>
  );
}
