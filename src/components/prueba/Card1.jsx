import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import ComponenteLugar from "../Seccion/ComponenteLugar";

const Prueba = () => {
  const [bussinesses, setBussinesses] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadMoreBussiness(offset, setOffset, setBussinesses);
    
  }, [offset]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
      {bussinesses.map((bussiness) => (
        <div key={bussiness.id}>
          <ComponenteLugar
            imagen={bussiness.perfil_pic}
            localizacion={bussiness.province}
            nombre={bussiness.name}
          ></ComponenteLugar>
        </div>
      ))}
      <button onClick={() => setOffset(offset + 10)}>
        Cargar más negocios
      </button>
    </div>
  );
};

export default Prueba;
