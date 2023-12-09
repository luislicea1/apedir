import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useBussinessStore } from "../../hooks/useStore";

function NegocioIdVip(props) {
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  return (
    <>
      {/* <Link to={`/lugar/${props.url}`} aria-label={"negocio"}> */}
      <Card
        className="py-4 tarjeta-negocio-card"
        style={{ ...CardStyles, margin: "5px 5px 5px 5px" }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{props.localizacion}</p>

          <h2
            className="font-bold text-large mb-2 titulo-card-negocio-panntalla-principal"
            style={{}}
          >
            {props.nombre}
          </h2>
        </CardHeader>
        <CardBody
          onClick={() => {
            console.log(props.bussiness.name);
            setBussiness(props.bussiness);
          }}
          className="overflow-visible py-2 card-body-seccion"
          style={ImgCardStyle}
        >
          <LazyLoadImage
            alt={props.nombre}
            src={props.imagen}
            effect="blur"
            style={{ ...LogoStyle, objectFit: "contain" }}
            placeholderSrc={props.imagen}
            useIntersectionObserver={true}
            className="lazyload"
            threshold={100}
            delayTime={300}
            delayMethod="throttle"
          />
        </CardBody>
      </Card>
      {/* </Link> */}
    </>
  );
}

export default NegocioIdVip;
