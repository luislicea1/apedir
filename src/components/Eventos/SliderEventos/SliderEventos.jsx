import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { eventsStore } from "../../../hooks/useStore";
import "./styles.css";
import { Empty } from "antd";
import Eventos from "../Eventos";
import { EffectCoverflow } from "swiper/modules";

export default function SliderEventos() {
  const events = eventsStore((state) => state.events);

  return (
    <>
      {events && events.length > 0 ? (
        <>
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}

            modules={[EffectCoverflow]}
            className="mySwiper"
            style={
              {
                width: "100%",

              }
            }
          >

            {events.map((evento, index) => (
              <SwiperSlide key={index} className="swiper-slide-events">
                <Eventos nombre={evento.name} imagen={evento.image}></Eventos>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <Empty />
        </>
      )}
    </>
  );
}
