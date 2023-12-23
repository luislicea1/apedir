import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { eventsStore } from "../../../hooks/useStore";
import "./styles.css";
import { grid_center } from "../../styles/styles";
import { Empty } from "antd";
import Eventos from "../Eventos";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";


export default function SliderEventos() {
  const listContainer = useRef(null);
  // const [events, setEvents] = useState([]);
  const events = eventsStore((state) => state.events);
  const setEvents = eventsStore((state) => state.setEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      const e = await getAllEvents();
      setEvents(e);
    };
    fetchEvents();
  }, []);

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
            loop = {true}
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
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            style={
              {
                width: "100%",
                padding: "0px 10px",
                
              }
            }
          >
           
            {events.map((evento, index) => (
              <SwiperSlide key={index}  className="swiper-slide-events">
                <Eventos nombre={evento.name} imagen={evento.image}></Eventos>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <Empty></Empty>
        </>
      )}
    </>
  );
}
