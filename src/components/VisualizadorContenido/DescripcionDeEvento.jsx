import React, { useState } from "react";

export default function DescripcionEvento(props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const words = props.descripcion.split(" ");
  const firstThirtyWords = words.slice(0, 30).join(" ");
  const description = showFullDescription ? props.descripcion : firstThirtyWords;
  const style = {
    fontWeight: "bold"
  }

  const contenedor = {
    width: '100%',
  }

  const white = {
    color: 'white'
  }

  const glass = {
    width: "90%",
    //position: "absolute",
    //bottom: "22vh",
    height: "20vh",
    //background: "rgba(150, 156, 161, 0.411)",
    marginBottom: "3%",
    //padding: "10px",
    zIndex: "1000",
    overflowY: "scroll"
    
}
const center = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center"
}
const centertext = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
    height: "15vh",
    overflowY: "scroll"
}
const title ={
    color: "#FFD600",
    fontWeight: "bold",
    fontSize: "30px"
}

const btn = {
    marginTop: "15px",
    width: "95%",
    
}

  return (
    <div style={glass}>
      <article className="mt-2" style={white}>
      {description}
      {words.length > 30 && (
        <button onClick={handleShowFullDescription} style={style} className="ml-2">
          {showFullDescription ? "Leer menos" : "Leer más"}
        </button>
      )}

      </article>
    
    </div>
    
  );
}
