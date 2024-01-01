import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import ComponenteLugar from "../Seccion/ComponenteLugar";
import { useBussinessList, useProvinceStore } from "../../hooks/useStore";
import ListadoSkeleton from "../Skeleton/ListadoSkeleton";
import { Autoplay } from "swiper/modules";
import { getStarsFromBusinesses } from "../../api/starsRate";
import "swiper/css";
import "./style.css";

const SliderNegocios = () => {
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
    if (!bussinesses || bussinesses.length === 0) {
      return null;
    }
    if (province !== "todas") {
      return bussinesses.filter((value) => value.province === province);
    } else {
      return bussinesses;
    }
  }, [bussinesses, province]);

  const fetchMoreData = async () => {
    try {
      const response = await loadMoreBussiness(
        offset,
        setOffset,
        bussinesses,
        setBussinesses
      );
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
    fetchMoreData()
  }, []);

  useEffect(() => {
    const fetchStars = async () => {
      const starsMap = await getStarsFromBusinesses(bussinesses.map(business => business.id));
      setBussinesses(bussinesses.map(business => ({ ...business, stars: starsMap[business.id] })));
    };
    if (bussinesses !== null) fetchStars();
  }, [bussinesses]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, hasMore]);

  return loading ? <ListadoSkeleton /> : (
    <div id="lugares">
      <Swiper
        spaceBetween={30}
        pagination={false}
        navigation={false}
        modules={[Autoplay]}
        className="slider-negocios"
        breakpoints={{
          280: { slidesPerView: 1, spaceBetween: 10 },
          380: { slidesPerView: 2.2, spaceBetween: 20 },
          711: { slidesPerView: 2.3, spaceBetween: 10 },
          1020: { slidesPerView: 3, spaceBetween: 10 },
        }}
        loop={true}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
      >
        {filtredBussinesses !== null &&
          filtredBussinesses.map((item) => (
            <SwiperSlide key={item.id}>
              <ComponenteLugar
                id={item.id}
                imagen={item.perfil_pic}
                localizacion={item.province}
                gps_location={item.gps_location}
                nombre={item.name}
                numeroPersonas={item.numeroPersonas}
                url={item.value_url}
                stars={item.stars}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SliderNegocios;
