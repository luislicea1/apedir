import React, { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  ImgCardStyle,
  CardStyles2,
  Imagen100pc400H,
  ProductoStyle,
} from "../../styles/styles";

import ImagenVisualizador from "../VisualizadorProducto/ImagenVisualizador";
import DescripcionDeP from "../VisualizadorProducto/DescripcionDeP";
import OrdenarProducto from "../VisualizadorProducto/OrdenarProducto";
import PromoProducto from "../VisualizadorProducto/PromoProducto";
import "./productos.css";

export default function Producto({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
  description,
  currency,
  onChangeCarrito,
}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [cantidad, setCantidad] = useState(0);

  const [carrito, setCarrito] = useState([]);

  // const handleAddToCart = (product) => {
  //   const newCarrito = [carrito, product];
  //   setCarrito((prevCarrito) => {
  //     const newCarrito = [
  //       ...prevCarrito,
  //       { title: product.title, quantity: product.quantity, image: img },
  //     ];
  //     onChangeCarrito(newCarrito);
  //     return newCarrito;
  //   });
  // };

  const sectionStyle2 = {
    width: "100%",
    maxWidth: "450px",
    height: "100vh",
    background: "#0F0D13",
  };

  return (
    <div>
      <Helmet>
        <link
          fetchpriority="high"
          rel="preload"
          href={img}
          as="image"
          //imagesrcset="image_400px.jpg 400w, image_800px.jpg 800w"
        />
      </Helmet>
      <Card
        shadow="sm"
        key={index}
        isPressable
        style={CardStyles2}
        className="producto-card"
        onClick={onOpen} 
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
        <CardFooter
          className="text-small justify-between"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "100%",
          }}
        >
          <div style={{ gridColumn: "span 2", marginBottom: "20px" }}>
            <b
              style={{
                fontSize: "20px",
              }}
            >
              {title}
            </b>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <p className="text-default-500">
              {price} {currency}
            </p>
          </div>

          {/* <Button onPress={onOpen}>View</Button> */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="full"
            style={{
              padding: "0px",
              background: "#0F0D13",
              position: "relative",
            }}
          >
            <ModalContent style={{ padding: "0px", position: " relative" }}>
              {(onClose) => (
                <div>
                  <ModalBody
                    style={{
                      padding: "0px",
                      width: "100vw",
                      display: "grid",
                      placeItems: "center",
                      position: "relative",
                    }}
                  >
                    <div style={{ ...sectionStyle2, position: "relative" }}>
                      <ImagenVisualizador image={img} />
                    </div>

                    <div className="sectionDescription ">
                      <DescripcionDeP
                        title={title}
                        text={description}
                        // onAddToCart={handleAddToCart}
                        image={img}
                        cantidad={cantidad}
                        price={price}
                        onClose={onClose}
                      ></DescripcionDeP>
                      <OrdenarProducto
                        onChangeQuantity={setCantidad}
                      ></OrdenarProducto>

                      <PromoProducto></PromoProducto>
                    </div>
                  </ModalBody>
                </div>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
    </div>
  );
}

Producto.propTypes = {
  localizacion: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
