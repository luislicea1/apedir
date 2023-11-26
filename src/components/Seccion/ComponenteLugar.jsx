import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import "./seccion.css";
import { useInView } from "react-intersection-observer";
import { getStarsFromBussiness } from "../../api/starsRate";
//import { LazyLoadImage } from 'react-lazy-load-image-component';
// import {Image} from "@nextui-org/react";

function ComponenteLugar(props) {
  const [stars, setStars] = useState(null);
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });
  const imagenRef = useRef(props.imagen); // Almacenar la imagen en una referencia

  useEffect(() => {
    imagenRef.current = props.imagen; // Actualizar la referencia cuando cambia la imagen
  }, [props.imagen]);

  useEffect(() => {
    const fetchStars = async () => {
      const s = await getStarsFromBussiness(props.id);
      console.log(s !== undefined && s !== null ? s : "");
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
          fetchpriority="high"
          rel="preload"
          href={imagenRef.current} // Usar la referencia en lugar del prop directamente
          as="image"
        />
      </Helmet>
      <Link to={`/lugar/${props.url}`} target="_blank">
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
            <Stars
              readOnly
              w={100}
              rate={stars?.average ? stars.average : 0}
              total={stars?.total}
            />
          </CardHeader>
          <CardBody
            className="overflow-visible py-2 card-body-seccion"
            style={ImgCardStyle}
            ref={ref}
          >
            {inView ? (
              // <LazyLoadImage
              //   alt={props.nombre}
              //   style={{ ...LogoStyle, objectFit: "contain" }}
              //   src={props.imagen}// use normal <img> attributes as props
              //   className="lazyload"
              //   effect="blur"
              // />

              <img
                src={props.imagen}
                alt={props.nombre}
                className="lazyload"
                loading="lazy"
                style={{ ...LogoStyle, objectFit: "contain" }}
              />
            ) : (
              // <Image
              //     style={{ ...LogoStyle, objectFit: "contain" }}
              //     alt="NextUI hero Image with delay"
              //     className="lazyload"
              //     //loading="lazy"
              //     src={props.imagen}
              //     fallbackSrc="https://via.placeholder.com/200x200"
              // />
              <div className="esqueleton-seccion-card"></div>
            )}
          </CardBody>
        </Card>
      </Link>
    </>
  );
}

export default ComponenteLugar;
