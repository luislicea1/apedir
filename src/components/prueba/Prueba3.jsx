import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAllBussiness } from "../../api/bussiness";
import "../Seccion/seccion.css";
import "../Seccion/seccion.css"


import { useBussinessList, useProvinceStore } from "../../hooks/useStore";

const ComponenteLugar = React.lazy(() =>
  import("../Seccion/ComponenteLugar").catch((error) => {
    console.error("Error loading ComponenteLugar:", error);
  })
);

const Prueba3 = () => {
  const bussinesses = useBussinessList((state) => state.bussinesses);
  const setBussinesses = useBussinessList((state) => state.setBussinesses);
  const province = useProvinceStore((state) => state.province);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const loaderRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    fetchAllBussiness().then((bussinesses) => {
      setBussinesses(bussinesses);
    });
  }, []);
  return (
    <div
    className="list-container"
    style={{
      gap: "10px",
      display: "grid",
      placeItems: "center",
      gridTemplateColumns:
        windowWidth < 371
          ? "1fr"
          : windowWidth < 713
          ? "1fr 1fr"
          : "1fr 1fr 1fr",
    }}
  >
      {bussinesses &&
        bussinesses.map((bussiness) => (
          <div key={bussiness.id}>
            <ComponenteLugar
              imagen={bussiness.perfil_pic}
              localizacion={bussiness.province}
              gps_location={bussiness.gps_location}
              nombre={bussiness.name}
              numeroPersonas={bussiness.numeroPersonas}
              url={bussiness.value_url}
              heigth={windowWidth < 713 ? "150px" : "272px"}
            ></ComponenteLugar>
          </div>
        ))}
    </div>
  );
};

export default Prueba3;
