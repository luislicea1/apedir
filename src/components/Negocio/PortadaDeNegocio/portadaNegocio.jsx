import React from "react";
import { PortadaDeNegocioStyles} from "../../styles/styles";
import { Imagen100pcCover, Degradado1 } from "../../styles/styles";
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
            imagesrcset="image_400px.jpg 400w, image_800px.jpg 800w"
          />
        </Helmet>
      <LazyLoadImage
              alt={props.nombre}
              src={props.imagenPortada}
              effect="blur"
              style={{ ...Imagen100pcCover, objectFit: "cover" }}
              delayMethod="debounce"
              delayTime={300}
              placeholderSrc={props.imagen}
              useIntersectionObserver={true}
              visibleByDefault={true}
            />
      {/* <div style={Degradado1}></div> */}
    </div>
  );
}

