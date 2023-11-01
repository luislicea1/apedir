import React from "react";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import HeartIconContainer from "../Icons/HeartIcon/HeartIconContainer";
import "./MR.css";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { grid_2_col, titleStyles , no_shadow} from "../styles/styles";
import Like from "../Like/Like";
import Stars from "../Stars/Stars";

export default function ComponenteMR(props) {
  const navigate = useNavigate();
  const styles = {
    width: "200px",
    boxShadow: "none",
    border: "none",
  };
  
  const padding_0 = {
    padding: "0"
  }
  return (
    <Link>
      <Card
        isBlurred
        className="bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        
      >
        <CardBody>
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center tarjetasMR"
            style={grid_2_col }
          >
            <div
              className="relative col-span-6 md:col-span-4 img-containerMR"
              style={styles}
            >
              <img
                style={no_shadow}
                alt="Album cover"
                className="object-cover img-sinShadow"
                height={200}
                shadow="md"
                src={props.imagen}
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    {props.localizacion}
                  </h3>
                  <h1 className="text-large font-medium mt-2">
                    {props.nombre}
                  </h1>
                </div>
              </div>

              <div className="likes-center mt-2" style={titleStyles }>
                {/* <Like></Like>
                <p className="mt-2 ml-2">{props.numeroPersonas}</p> */}
                <Stars w = {100} readOnly rating = {4.5}></Stars>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}


