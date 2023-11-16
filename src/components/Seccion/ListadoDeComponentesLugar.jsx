import React, { useState, useEffect, lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./seccion.css";

// Importar ComponenteLugar de manera diferida
const ComponenteLugar = React.memo(lazy(() => import("./ComponenteLugar")));

const ListadoDeComponentesLugar = ({ lugares }) => {
 const [items, setItems] = useState([]);
 const [hasMore, setHasMore] = useState(true);
 const [isLoading, setIsLoading] = useState(false);
 const [windowWidth, setWindowWidth] = useState(window.innerWidth);

 useEffect(() => {
 const handleResize = () => {
   setWindowWidth(window.innerWidth);
 };

 window.addEventListener('resize', handleResize);

 const initialItems = lugares.slice(0, windowWidth < 380 ? 4: windowWidth < 713 ? 6 : 6);
 setItems(initialItems);
 if (lugares.length <= initialItems.length) {
   setHasMore(false);
 }

 return () => {
   window.removeEventListener('resize', handleResize);
 };
 }, [lugares, windowWidth]);

 const fetchMoreData = () => {
 setIsLoading(true);
 setTimeout(() => {
   const nextItems = lugares.slice(items.length, items.length + (windowWidth < 380 ? 4: windowWidth < 713 ? 6 : 6));
   setItems([...items, ...nextItems]);
   setIsLoading(false);
   if (items.length + nextItems.length >= lugares.length) {
     setHasMore(false);
   }
 }, 1500);
 };

 return (
 <InfiniteScroll
   dataLength={items.length}
   next={fetchMoreData}
   hasMore={hasMore}
   loader={isLoading ? <h4>Loading...</h4> : null}
 >
   <div className="list-container" style={{gap:"10px", display: 'grid', gridTemplateColumns: windowWidth < 380 ? '1fr' : windowWidth < 713 ? '1fr 1fr' : '1fr 1fr 1fr' }}>
     {items.map((lugar, index) => (
       <Suspense>
         <ComponenteLugar
           key={index}
           nombre={lugar.nombre}
           localizacion={lugar.localizacion}
           numeroPersonas={lugar.numeroPersonas}
           imagen={lugar.imagen}
           heigth={windowWidth < 713 ? '100px':"272px"}
         />
       </Suspense>
     ))}
   </div>
 </InfiniteScroll>
 );
};

export default ListadoDeComponentesLugar;



