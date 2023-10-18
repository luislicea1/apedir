import React from "react";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import HeartIconContainer from "../Icons/HeartIcon/HeartIconContainer";
import "./MR.css";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function ComponenteMR(props) {
  const navigate = useNavigate();
  const styles = {
    width: "200px",
    boxShadow: "none",
    border: "none",
  };
  const shadow = {
    boxShadow: "none",
    border: "none",
  };
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "20px",
  };
  const likesDiv = {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
  };

  return (
    <Link>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div
            className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center tarjetasMR"
            style={grid}
          >
            <div
              className="relative col-span-6 md:col-span-4 img-containerMR"
              style={styles}
            >
              <img
                style={shadow}
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

              <div className="likes-center" style={likesDiv}>
                <HeartIconContainer></HeartIconContainer>
                <p className="mt-2 ml-2">{props.numeroPersonas}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
