import React from "react";
import { Link } from "react-router-dom";
import { eventoMargin } from "../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Eventos(props) {
  return (
    <div style={eventoMargin}>
      <Link to={`/evento/${props.nombre}`} aria-label="evento">
        <div
          style={{
            border: "4px solid #F31260",
            borderRadius: "10px",
            overflow: "hidden",
            width: "140px",
            height: "140px",
          }}
        >
          <LazyLoadImage
            alt={props.nombre}
            src={props.imagen}
            width={140}
            height={140}
            effect="blur"
            style={{ objectFit: "cover" }}
            delayMethod="debounce"
            delayTime={100}
            placeholderSrc={props.imagen}
            useIntersectionObserver={true}
          />
        </div>
      </Link>
    </div>
  );
}
