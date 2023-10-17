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

  return (
    <>
      <article className="mt-2">
      {description}
      {words.length > 30 && (
        <button onClick={handleShowFullDescription} style={style} className="ml-2">
          {showFullDescription ? "Leer menos" : "Leer más"}
        </button>
      )}

    </article>
    
    </>
    
  );
}
