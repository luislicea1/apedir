import React from 'react';
import { QRCode } from 'antd';
import logo from "../../assets/LogoBlancoApp.png"

const QR = (props) => {
 const value = props.negocio === "si" ? `https://apedir.pages.dev/lugar/${props.url}` : "https://apedir.pages.dev/";
    const icon = props.negocio === "si" ? props.imagen : logo;

 return (
  <QRCode
    errorLevel="H"
    value={value}
    icon={icon}
    color='white'
    size={200}
    iconSize={50}
  />
 );
};

export default QR;
