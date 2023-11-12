import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, Link, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";

export default function ComponenteLugar(props) {
  const navigate = useNavigate();

  ComponenteLugar.propTypes = {
    localizacion: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    numeroPersonas: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  };

  return (
    <Link
      onClick={() => navigate(`/lugar/${props.localizacion}/${props.nombre}`)}
    >
      <Card className="py-4" style={CardStyles}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{props.localizacion}</p>
          <h2
            className="font-bold text-large mb-2"
            style={{ fontSize: "25px" }}
          >
            {props.nombre}
          </h2>
          <Stars readOnly w={100} rating={3.5}></Stars>
        </CardHeader>
        <CardBody className="overflow-visible py-2" style={ImgCardStyle}>
          <Helmet>
            <link rel="preload" href="{props.imagen}" />
          </Helmet>
          <LazyLoadImage
            alt="NextUI hero Image with delay"
            className="object-cover rounded-xl"
            src={props.imagen}
            effect="blur"
            style={LogoStyle}
            delayMethod="debounce"
            delayTime={300}
            placeholderSrc={props.imagen}
            useIntersectionObserver={true}
            visibleByDefault = {true}
          />
          <span>{props.imagen.caption}</span>
        </CardBody>
      </Card>
    </Link>
  );
}
