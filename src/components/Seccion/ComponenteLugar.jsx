import React, { useEffect } from 'react'
import { Card, CardHeader, CardBody, Image ,Link} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CardStyles, ImgCardStyle, ImgStyle, LogoStyle } from "../styles/styles";
import Stars from "../Stars/Stars";

export default function ComponenteLugar(props) {
 const navigate = useNavigate();
 
 ComponenteLugar.propTypes = {
   localizacion: PropTypes.string.isRequired,
   nombre: PropTypes.string.isRequired,
   numeroPersonas: PropTypes.number.isRequired,
   imagen: PropTypes.string.isRequired,
 };

 useEffect(() => {
   if (props.imagen) {
     const link = document.createElement('link');
     link.rel = 'preload';
     link.href = props.imagen;
     link.as = 'image';
     document.head.appendChild(link);
   }
 }, [props.imagen]);
 
 return (
   <Link onClick={() => navigate(`/lugar/${props.localizacion}/${props.nombre}`)}>
     <Card className="py-4" style={CardStyles}>
       <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
         <p className="text-tiny uppercase font-bold">{props.localizacion}</p>
         <h2 className="font-bold text-large mb-2" style={{fontSize: "25px"}}>{props.nombre}</h2>
         <Stars readOnly w = {100} rating = {3.5}></Stars>
       </CardHeader>
       <CardBody className="overflow-visible py-2" style={ImgCardStyle}>
         <Image
           alt="NextUI hero Image with delay"
           className="object-cover rounded-xl"
           src={props.imagen}
           style={LogoStyle}
         />
       </CardBody>
     </Card>
   </Link>
 );
}
