import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./seccion.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@nextui-org/react"
import { PremiumIcon } from "../Icons/PremiumIcon";

function ComponenteLugar(props) {
  // const [stars, setStars] = useState(null);
  //const imagenRef = useRef(props.imagen); // Almacenar la imagen en una referencia
  library.add(faS)
  const stars = props.stars
  return (
    <>

      <Link to={`/lugar/${props.url}`} aria-label={"negocio"}>
        {props.privileges > 2 && <section
          style={{ color: "red", position: 'absolute', top: '20px', right: '5px', zIndex: 5 }}
        >
          <PremiumIcon width={30} />
        </section>
        }
        <Card
          className="py-4 tarjeta-negocio-card"
          style={{ ...CardStyles, margin: "5px 5px 5px 5px", boxShadow: "none", border: ".8px solid #D4D4D8", position: 'relative' }}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">

            <p className="text-tiny uppercase font-bold">
              {props.localizacion}
            </p>
            <section>
              <h2
                className="font-bold text-large mb-2 titulo-card-negocio-panntalla-principal"
                style={{}}
              >
                {props.nombre}
              </h2>
            </section>
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
              style={{ ...LogoStyle, objectFit: "cover" }}
              placeholderSrc={props.imagen}
              useIntersectionObserver={true}
              className="lazyload"
              threshold={100}
              delayTime={300}
              delayMethod="throttle"

            />
          </CardBody>
        </Card>
      </Link >
    </>
  );
}

export default ComponenteLugar;


