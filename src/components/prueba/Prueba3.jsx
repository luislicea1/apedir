import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { loadMoreBussiness, fetchAllBussiness } from "../../api/bussiness";
import Loader from "../Loader/Loader";
import "../Seccion/seccion.css";

import { useBussinessList, useProvinceStore } from "../../hooks/useStore";

const ComponenteLugar = React.lazy(() =>
 import( "../Seccion/ComponenteLugar").catch((error) => {
 console.error("Error loading ComponenteLugar:", error);
 })
);

const Prueba2 = () => {
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
    fetchAllBussiness().then((bussinesses) => {
      setBussinesses(bussinesses);
    });
   }, []);
   return (
    <div style={{width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}> 
      {bussinesses && bussinesses.map((bussiness) => (
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

export default Prueba2;
