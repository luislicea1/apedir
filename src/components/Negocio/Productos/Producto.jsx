import React from 'react'
import { Card, CardBody, CardFooter} from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  ImgCardStyle,
  CardStyles2,
  Imagen100pc400H,
  ProductoStyle
} from "../../styles/styles";

export default function Producto({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
}) {
  const navigate = useNavigate();

  return (
    <Link href={`/lugar/${localizacion}/${nombre}/producto/${title}`}>
      <Helmet>
          <link
            fetchpriority="high"
            rel="preload"
            href={img}
            as="image"
            imagesrcset="image_400px.jpg 400w, image_800px.jpg 800w"
          />
        </Helmet>
      <Card
        shadow="sm"
        key={index}
        isPressable
        // onPress={() => console.log("item pressed")}
        style={CardStyles2}
        className="producto-card"
      >
        <CardBody className="overflow-visible p-0" style={ImgCardStyle}>
          
           <LazyLoadImage
              alt={title}
              src={img}
              effect="blur"
              style={{ ...ProductoStyle, objectFit: "cover" }}
              delayMethod="debounce"
              delayTime={300}
              placeholderSrc={img}
              useIntersectionObserver={true}
              visibleByDefault={true}
            />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b>{title}</b>
          <p className="text-default-500">{price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

Producto.propTypes = {
  localizacion: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
