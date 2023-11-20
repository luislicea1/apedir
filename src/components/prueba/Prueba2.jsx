import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { loadMoreBussiness } from "../../api/bussiness";
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


 const fetchMoreData = async () => {
 try {
 const response = await loadMoreBussiness(
   offset,
   setOffset,
   bussinesses,
   setBussinesses
 );

 if (
   response !== null &&
   response !== undefined &&
   response.length === 0
 ) {
   setHasMore(false);
 } else {
   setPage((prevPage) => prevPage + 1);
 }
 } catch (error) {
 console.error("Error fetching more data:", error);
 }
 };

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

 return (
 <div
 className="list-container"
 style={{
   gap: "10px",
   display: "grid",
   placeItems: "center",
   gridTemplateColumns:
     windowWidth < 390
       ? "1fr"
       : windowWidth < 713
       ? "1fr 1fr"
       : "1fr 1fr 1fr",
 }}
 >
 {bussinesses && bussinesses.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ComponenteLugar
      imagen={item.perfil_pic}
      localizacion={item.province}
      gps_location={item.gps_location}
      nombre={item.name}
      numeroPersonas={item.numeroPersonas}
      url={item.value_url}
      heigth={windowWidth < 713 ? "150px" : "272px"}
    ></ComponenteLugar>
  </motion.div>
 ))}
 {hasMore && (
   <div ref={ref} style={{ textAlign: "center" }}>
     <Loader ref={loaderRef}></Loader>
   </div>
 )}
 </div>
 );
};

export default Prueba2;
