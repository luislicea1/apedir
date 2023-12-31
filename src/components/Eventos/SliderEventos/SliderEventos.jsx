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
  const listContainer = useRef(null);
  const events = eventsStore((state) => state.events);


  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      let scrollAmount = 0;
      if (e.deltaY < 0) {
        scrollAmount = Math.max(-30, e.deltaY);
      } else {
        scrollAmount = Math.min(30, e.deltaY);
      }
      listContainer.current.scrollLeft += scrollAmount;
    };

    if (listContainer.current) {
      listContainer.current.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (listContainer.current) {
        listContainer.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);
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
                // padding: "10px 10px",

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
