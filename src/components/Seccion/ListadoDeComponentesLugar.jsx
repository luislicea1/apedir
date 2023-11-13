// import React from "react";
// import "./seccion.css";
// import ComponenteLugar from "./ComponenteLugar";
// import { grid_3_col } from "../styles/styles";

// export default function ListadoDeComponentesLugar(props) {
//   const lugares = props.lugares;
//   return (
//     <div className="list-container" style={grid_3_col}>
//       {lugares.map((lugar, index) => (
//         <ComponenteLugar
//           key={index}
//           nombre={lugar.nombre}
//           localizacion={lugar.localizacion}
//           numeroPersonas={lugar.numeroPersonas}
//           imagen={lugar.imagen}
//         />
//       ))}
//     </div>
//   );
// }


import React, { useState, useEffect,lazy } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
//import ComponenteLugar from "./ComponenteLugar";
import { grid_3_col } from "../styles/styles";
import "./seccion.css";

const ComponenteLugar = lazy(()=>import ("./ComponenteLugar"))

const ListadoDeComponentesLugar = ({ lugares }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Cargar los primeros 6 elementos al inicio
    const initialItems = lugares.slice(0, 3);
    setItems(initialItems);

    // Desactivar la carga si no hay más elementos
    if (lugares.length <= 6) {
      setHasMore(false);
    }
  }, [lugares]);

  const fetchMoreData = () => {
    // Simular la carga de más elementos después de 6
    setTimeout(() => {
      const nextItems = lugares.slice(items.length, items.length + 3);
      setItems([...items, ...nextItems]);

      // Desactivar la carga si no hay más elementos
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
      loader={<h4>Loading...</h4>}
    >
      <div
        className="list-container" style={grid_3_col}
      >
        {items.map((lugar, index) => (
          <ComponenteLugar
            key={index}
            nombre={lugar.nombre}
            localizacion={lugar.localizacion}
            numeroPersonas={lugar.numeroPersonas}
            imagen={lugar.imagen}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ListadoDeComponentesLugar;


