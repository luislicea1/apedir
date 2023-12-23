import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import Novedades from "./Novedades";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";

export default function SliderNovedades() {
  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <TituloDeSeccion title={"Novedades"}></TituloDeSeccion>

        <Swiper
          spaceBetween={10}
          style={{ width: "100%", height: "170px"}}
          // pagination={{
          //   clickable: true,
          // }}
          pagination={false}
          navigation={false}
          modules={[Pagination, Navigation, HashNavigation]}
          className="mySwiper"
          breakpoints={{
            711: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <Novedades></Novedades>
          </SwiperSlide>
          <SwiperSlide>
            <Novedades></Novedades>
          </SwiperSlide>
          <SwiperSlide>
            <Novedades></Novedades>
          </SwiperSlide>
          <SwiperSlide>
            <Novedades></Novedades>
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
