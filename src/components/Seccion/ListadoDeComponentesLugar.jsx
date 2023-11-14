import React, { useState, useEffect, lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { grid_3_col } from "../styles/styles";
import "./seccion.css";

// Importar ComponenteLugar de manera diferida
const ComponenteLugar = React.memo(lazy(() => import("./ComponenteLugar")));

const ListadoDeComponentesLugar = ({ lugares }) => {
 const [items, setItems] = useState([]);
 const [hasMore, setHasMore] = useState(true);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
   const initialItems = lugares.slice(0, window.innerWidth < 713 ? 3 : 6);
   setItems(initialItems);
   if (lugares.length <= initialItems.length) {
     setHasMore(false);
   }
 }, [lugares]);

 const fetchMoreData = () => {
   setIsLoading(true);
   setTimeout(() => {
     const nextItems = lugares.slice(items.length, items.length + 3);
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
     <div className="list-container" style={grid_3_col}>
       {items.map((lugar, index) => (
         <Suspense>
           <ComponenteLugar
             key={index}
             nombre={lugar.nombre}
             localizacion={lugar.localizacion}
             numeroPersonas={lugar.numeroPersonas}
             imagen={lugar.imagen}
           />
         </Suspense>
       ))}
     </div>
   </InfiniteScroll>
 );
};

export default ListadoDeComponentesLugar;
