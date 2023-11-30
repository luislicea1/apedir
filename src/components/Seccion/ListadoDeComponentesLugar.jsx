import React, {
  useState,
  useEffect,
  useMemo,
  
} from "react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import Loader from "../Loader/Loader";
import ComponenteLugar from "./ComponenteLugar";

import "./seccion.css";
import { useBussinessList, useProvinceStore } from "../../hooks/useStore";

const ListadoDeComponentesLugar = () => {
  const bussinesses = useBussinessList((state) => state.bussinesses);
  const setBussinesses = useBussinessList((state) => state.setBussinesses);
  const province = useProvinceStore((state) => state.province);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      ref={ref}
      className="list-container"
      style={{
        gap: "10px",
        display: "grid",
        placeItems: "center",
        alignContent: "stretch",
        gridTemplateColumns:
          windowWidth < 380
            ? "1fr"
            : windowWidth < 720
            ? "1fr 1fr"
            : "1fr 1fr 1fr",
      }}
    >
      {filtredBussinesses !== null &&
        filtredBussinesses.map((item) => {
          return (
            <div key={item.id}>
              <ComponenteLugar
                id={item.id}
                imagen={item.perfil_pic}
                localizacion={item.province}
                gps_location={item.gps_location}
                nombre={item.name}
                numeroPersonas={item.numeroPersonas}
                url={item.value_url}
                heigth={windowWidth < 713 ? "150px" : "272px"}
              ></ComponenteLugar>
            </div>
          );
        })}
      {hasMore && loading  && (
        <div style={{ textAlign: "center" }}>
          <Loader></Loader>
        </div>
      )}
    </div>
  );
};

export default ListadoDeComponentesLugar;
