import React from "react";
import { Link } from "react-router-dom";
import { eventoMargin, grid_center } from "../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {Card, CardBody} from "@nextui-org/react";

export default function Eventos(props) {
  return (
    <div style={eventoMargin}>
      <Link to={`/evento/${props.nombre}`} aria-label="evento">
        <Card
          style={{
            
            borderRadius: "20px",
            overflow: "hidden",
            // width: "180px",
            // height: "200px",
            width: "300px",
            height: "300px",
            boxShadow: "none",
            border: ".5px #E2E2E2 solid"
          }}
          className="card-events"
        >
          <LazyLoadImage
            alt={props.nombre}
            src={props.imagen}
            
            effect="blur"
            // style={{ objectFit: "cover", width: "200px", height: "200px" }}
            style={{ objectFit: "cover", width: "300px", height: "300px" }}
            delayMethod="debounce"
            delayTime={100}
            placeholderSrc={props.imagen}
            useIntersectionObserver={true}
            className="card-events-lazyload"
          />
        </Card>
      </Link>
    </div>
  );
}
