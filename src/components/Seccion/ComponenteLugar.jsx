import React, { Suspense } from "react";
import { Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import "./seccion.css";

function ComponenteLugar(props) {
  const navigate = useNavigate();

  ComponenteLugar.propTypes = {
    localizacion: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    numeroPersonas: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  };

  return (
    <Suspense>
      <Link
        onClick={() => navigate(`/lugar/${props.localizacion}/${props.nombre}`)}
      >
        <Helmet>
          <link
            fetchpriority="high"
            rel="preload"
            href={props.imagen}
            as="image"
            imagesrcset="image_400px.jpg 400w, image_800px.jpg 800w"
          />
        </Helmet>

        <Card className="py-4" style={CardStyles}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              {props.localizacion}
            </p>
            <h2
              className="font-bold text-large mb-2"
              style={{ fontSize: "1em" }}
            >
              {props.nombre}
            </h2>
            <Stars readOnly w={100} rating={3.5}></Stars>
          </CardHeader>
          <CardBody className="overflow-visible py-2" style={ImgCardStyle}>
            <LazyLoadImage
              alt={props.nombre}
              src={props.imagen}
              effect="blur"
              style={{
                ...LogoStyle,
                objectFit: "contain",
                height: props.heigth,
              }}
              delayMethod="debounce"
              delayTime={300}
              placeholderSrc={props.imagen}
              useIntersectionObserver={true}
              visibleByDefault={true}
              className="lazyLoad"
            />

            {props.imagen.caption && <span>{props.imagen.caption}</span>}
            {/* <Image
              alt="NextUI hero Image with delay"
              src={props.imagen}
              style={LogoStyle}
              loading="lazy"
              skeleton={true}
              /
            > */}
          </CardBody>
        </Card>
      </Link>
    </Suspense>
  );
}

export default React.memo(ComponenteLugar, (prevProps, nextProps) => {
  return prevProps.imagen == nextProps.imagen;
});
