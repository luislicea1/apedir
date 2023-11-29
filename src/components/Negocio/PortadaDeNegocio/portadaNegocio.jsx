import React from "react";
import { PortadaDeNegocioStyles} from "../../styles/styles";
import { Imagen100pcCover} from "../../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";

export default function PortadaDeNegocio(props) {
  return (
    <div style={PortadaDeNegocioStyles}>
       <Helmet>
          <link
            fetchpriority="high"
            rel="preload"
            href={props.imagenPortada}
            as="image"
          />
        </Helmet>
      <LazyLoadImage
              alt={props.nombre}
              src={props.imagenPortada}
              effect="blur"
              style={{ ...Imagen100pcCover, objectFit: "cover" }}
              delayMethod="debounce"
              delayTime={100}
              placeholderSrc={props.imagen}
              useIntersectionObserver={true}
              //visibleByDefault={true}
            />
      {/* <div style={Degradado1}></div> */}
    </div>
  );
}

