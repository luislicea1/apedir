import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import "./seccion.css";
import { useInView } from "react-intersection-observer";
import { getStarsFromBussiness } from "../../api/starsRate";

function ComponenteLugar(props) {
  const [stars, setStars] = useState(null);
  // const { ref, inView } = useInView({
  //   threshold: 1,
  //   triggerOnce: true,
  // });
   const imagenRef = useRef(props.imagen); // Almacenar la imagen en una referencia

  // useEffect(() => {
  //   imagenRef.current = props.imagen; // Actualizar la referencia cuando cambia la imagen
  // }, [props.imagen]);

  useEffect(() => {
    const fetchStars = async () => {
      const s = await getStarsFromBussiness(props.id);
      setStars(
        s !== null && s !== undefined
          ? s
          : { bussiness: props.id, stars_num: 0, average: 0, total: 0 }
      );
    };
    if (props.id !== undefined) {
      fetchStars();
    }
  }, [props.id]);

  return (
    <>
      <Helmet>
        <link
          //fetchpriority="high"
          //rel="preload"
          //href={imagenRef.current} // Usar la referencia en lugar del prop directamente
          //as="image"
        />
      </Helmet>
      <Link to={`/lugar/${props.url}`}>
        <Card
          className="py-4 tarjeta-negocio-card"
          style={{ ...CardStyles, margin: "5px 5px 5px 5px" }}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">
              {props.localizacion}
            </p>

            <h2
              className="font-bold text-large mb-2 titulo-card-negocio-panntalla-principal"
              style={{}}
            >
              {props.nombre}
            </h2>
            <Stars readOnly w={100} rate={stars?.average ? stars.average : 0} />
          </CardHeader>
          <CardBody
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
      </Link>
    </>
  );
}

export default ComponenteLugar;

// {inView ? (
//   <img
//     src={props.imagen}
//     alt={props.nombre}
//     className="lazyload"
//     loading="lazy"
//     style={{ ...LogoStyle, objectFit: "contain" }}
//   />
// ) : (
//   <div className="esqueleton-seccion-card"></div>
// )}
