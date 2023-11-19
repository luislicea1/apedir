import React from "react";
import { FontBold20px } from "../../styles/styles";

export default function TituloDeProductos(props) {
  const style = {
    width: "100%",
    marginTop: "30px",
    marginBottom: "30px",
  };
  return (
    <div id={props.title} style={style} className="mb-2">
      <h2
        style={{
          ...FontBold20px,
          maxWidth: "70ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {" "}
        {props.title}
      </h2>
    </div>
  );
}
