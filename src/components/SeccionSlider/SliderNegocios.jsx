import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/grid';

import "./style.css";
import React, { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import Loader from "../Loader/Loader";
import ComponenteLugar from "../Seccion/ComponenteLugar";

import "../Seccion/seccion.css";
import { useBussinessList, useProvinceStore } from "../../hooks/useStore";

import ListadoSkeleton from "../Skeleton/ListadoSkeleton";

// import required modules
import { Pagination, Navigation, HashNavigation, Grid, Autoplay } from "swiper/modules";

export default function SliderNegocios() {
  const bussinesses = useBussinessList((state) => state.bussinesses);
  const setBussinesses = useBussinessList((state) => state.setBussinesses);
  const province = useProvinceStore((state) => state.province);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const filtredBussinesses = useMemo(() => {
    if (bussinesses?.length === 0) {
      return null;
    }
    if (province !== "todas") {
      return bussinesses.filter((value) => value.province === province);
    } else {
      return bussinesses;
    }
  }, [bussinesses, province]);

  // const fetchMoreData = async () => {
  //   try {
  //     const response = await loadMoreBussiness(
  //       offset,
  //       setOffset,
  //       bussinesses,
  //       setBussinesses
  //     );
  //     setLoading(false);

  //     if (!response) {
  //       setHasMore(false);
  //     } else {
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching more data:", error);
  //   }
  // };

  const fetchMoreData = async () => {
    try {
      const response = await loadMoreBussiness(
        offset,
        setOffset,
        bussinesses,
        setBussinesses
      );
   
      if (!response) {
        console.error("No hay datos disponibles.");
        alert("errror nulo")
        window.location.reload(true);
        return;
      }
   
      setLoading(false);
      if (!response) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
   };
   
  useEffect(() => {
    const fetchData = () => {
      fetchMoreData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, hasMore]);

  if (loading) {
    return <ListadoSkeleton />;
  }

  // if(!filtredBussinesses){
  //   alert("null")
  //   window.location.reload(true)
  // }
  return (
    <div id="lugares">
      <Swiper
        spaceBetween={30}
        // hashNavigation={{
        //   watchState: true,
        // }}
        // pagination={{
        //   clickable: true,
        // }}
        pagination = {false}
        navigation={false}
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        className="slider-negocios"
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          380: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
            711: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            
            1020: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          
         
      >
        {filtredBussinesses !== null &&
          filtredBussinesses.map((item) => {
            
            return (
              <SwiperSlide key={item.id}>
                <ComponenteLugar
                  id={item.id}
                  imagen={item.perfil_pic}
                  localizacion={item.province}
                  gps_location={item.gps_location}
                  nombre={item.name}
                  numeroPersonas={item.numeroPersonas}
                  url={item.value_url}
                ></ComponenteLugar>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
     
   
  );
}


/**
 *  <Swiper
        spaceBetween={30}
        // hashNavigation={{
        //   watchState: true,
        // }}
        // pagination={{
        //   clickable: true,
        // }}
        pagination = {false}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper"
        breakpoints={{
            711: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
      >
        {filtredBussinesses !== null &&
          filtredBussinesses.map((item) => {
            
            return (
              <SwiperSlide key={item.id}>
                <ComponenteLugar
                  id={item.id}
                  imagen={item.perfil_pic}
                  localizacion={item.province}
                  gps_location={item.gps_location}
                  nombre={item.name}
                  numeroPersonas={item.numeroPersonas}
                  url={item.value_url}
                ></ComponenteLugar>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
 */