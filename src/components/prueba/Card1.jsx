import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import ComponenteLugar from "../Seccion/ComponenteLugar";
import InfiniteScroll from "react-infinite-scroll-component";

const Prueba = () => {
  const [bussinesses, setBussinesses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  //const [page, setPage] = useState(0);
  //const [offset, setOffset] = useState(0);
  //const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const elementRef = useRef(null);

  function onInterseccion(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreData();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onInterseccion);
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [bussinesses]);

  async function fetchMoreData() {
    const response = await loadMoreBussiness(offset, setOffset, setBussinesses);
    const data = await response.json();
    if (data.bussiness.length == 0) {
      setHasMore(false);
    } else {
      setBussinesses((prevBussiness) => [...prevBussiness, ...data.business]);
      setPage((prevPage) => prevPage + 1);
    }
  }

  return (
     
    <>
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
        <div ref={elementRef} style={{ textAlign: "center" }}>
          Loading
        </div>
      )}
    </>
  );
};

export default Prueba;
