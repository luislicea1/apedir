import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import Novedades from "./Novedades";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import { merchantNovedades } from "../../hooks/useStore";
import { getAllNovedades } from "../../api/novedades";

export default function SliderNovedades() {
  const novedades = merchantNovedades(state => state.novedades)
  const setNovedades = merchantNovedades(state => state.setNovedades)

  React.useEffect(() => {
    const fetchNovedades = async () => {
      const n = await getAllNovedades()
      setNovedades(n)
    }
    if (novedades.length === 0) fetchNovedades()
  }, []);

  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section} id="novedades">
        <TituloDeSeccion title={"Novedades"}></TituloDeSeccion>

        <Swiper
          spaceBetween={10}
          style={{ width: "100%", padding: "10px" }}
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
          {novedades.map((novedad) => {
            return (
              <SwiperSlide key={novedad.id}>
                <Link to={`/lugar/${novedad.value_url}`}>
                  <Novedades novedad={novedad} />
                </Link>
              </SwiperSlide>
            )
          })

          }
        </Swiper>
      </section>

    </div>
  );
}
