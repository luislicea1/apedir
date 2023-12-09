import React from "react";
import { QRCode, Space } from "antd";
import logo from "../../assets/LogoBlancoApp.png";
import { Button } from "@nextui-org/react";

const downloadQRCode = () => {
  const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const QR = (props) => {
  const value =
    props.negocio === "si"
      ? `https://apedir.pages.dev${props.url}`
      : "https://apedir.pages.dev/";
  const icon = props.negocio === "si" ? props.imagen : logo;

  return (
    <div id="myqrcode">
      {props.url ? (
        <>
          <QRCode
            value={value}
            bgColor="#fff"
            style={{
              marginBottom: 16,
            }}
            icon={icon}
          />

          <Button type="primary" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </>
      ) : (
        <>
          <QRCode value="https://ant.design/" status="loading" />
        </>
      )}
    </div>
  );
};

export default QR;
