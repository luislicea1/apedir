import React, { useState, useEffect, useRef,lazy } from "react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness, fetchAllBussiness } from "../../api/bussiness";


import "./seccion.css";

// Importar ComponenteLugar de manera diferida
const ComponenteLugar = React.memo(lazy(() => import("./ComponenteLugar")));

const ListadoDeComponentesLugar = () => {
  const [bussinesses, setBussinesses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
  const { ref, inView } = useInView({
    threshold: 0,
  });
 
  useEffect(() => {
    if (inView) {
      fetchMoreData();
    }
  }, [inView]);
 
  async function fetchMoreData() {
    const response = await loadMoreBussiness(offset, setOffset, setBussinesses);
    if (response.length === 0) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  }
 
  useEffect(() => {
    fetchMoreData();
  }, []);
 
  useEffect(() => {
   const handleResize = () => setWindowWidth(window.innerWidth);
   window.addEventListener('resize', handleResize);
   return () => {
     window.removeEventListener('resize', handleResize);
   };
  }, []);
 
  return (
   <div className="list-container" style={{gap:"10px", display: 'grid', gridTemplateColumns: windowWidth < 380 ? '1fr' : windowWidth < 713 ? '1fr 1fr' : '1fr 1fr 1fr' }}>
      {bussinesses.map((item) => (
        <div key={item.id}>
          <ComponenteLugar
            imagen={item.perfil_pic}
            localizacion={item.province}
            nombre={item.name}
          ></ComponenteLugar>
        </div>
      ))}
      {hasMore && (
        <div ref={ref} style={{ textAlign: "center" }}>
         
        </div>
      )}
    </div>
  );
 };
 
 export default ListadoDeComponentesLugar;


