import "./footer.css";
import LogoReduce from "../../assets/logoReduce/LogoReduce";
import { Link, Textarea, Button } from "@nextui-org/react";
import WhatsappIcons from "../Icons/whatsapp/WhatsappIcon";
import InstagramIcon from "../Icons/Instagram/InstagramIcon";
import TelegramIcon from "../Icons/Telegram/Telegram";
import Correo from "../Icons/Correo/correo";
import FaceBookIcon from "../Icons/Facebook/FaceBookIcon";
import React, { useState } from "react";

export default function Footer() {
  const [message, setMessage] = useState("");

  return (
    <div className="footer-principal">
      <div className="footer-logo">

        <LogoReduce w={100} color="white"></LogoReduce>
        
      </div>

      <div className="footer-social-media">
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`mailto:apedir@gmail`} target="_blank" rel="noreferrer">
              <Correo color={"white"} w={"30px"}></Correo>
            </a>
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`https://t.me/djm0x`} target="_blank" rel="noreferrer">
              <TelegramIcon color={"white"} w={"49px"}></TelegramIcon>
            </a>
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`https://www.facebook.com/Apedir`} target="_blank" rel="noreferrer">
              <FaceBookIcon
                color={"white"}
                w={"36px"}
                h={"36px"}
              ></FaceBookIcon>
            </a>
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`https://www.instagram.com/apedir_cuba`} target="_blank" rel="noreferrer">
              <InstagramIcon color={"white"} w={"36px"}></InstagramIcon>
            </a>
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`https://wa.me/555971705`} target="_blank" rel="noreferrer">
              <WhatsappIcons color={"white"} w={"36px"}></WhatsappIcons>
            </a>
          </div>
        </div>

      <div>
        <nav className="nav-footer">
          <Link href="/" underline="hover" style={{ color: "white" }} >
            Home
          </Link>
          <Link href="#eventos" underline="hover" style={{ color: "white" }}>
            Eventos
          </Link>
          <Link href="#novedades" underline="hover" style={{ color: "white" }}>
            Novedades
          </Link>
          <Link href="#productos-recomendados" underline="hover" style={{ color: "white" }}>
            Productos Recomendados
          </Link>
          <Link href="#lugares" underline="hover" style={{ color: "white" }}>
            Lugares
          </Link>
          <Link href="/plans" underline="hover" style={{ color: "white" }}>
            Planes y Precios
          </Link>
          <Link href="/ayudaInformacion" underline="hover" style={{ color: "white" }}>
            Ayuda e Información
          </Link>
        </nav>
      </div>

      <div className="footer-contact" style={{ width: "100%" }} >
        <h3>Contactenos</h3>
        <Textarea
          fullWidth
          style={{ color: "black", border: "white" , height: "100px"}}
          // variant="bordered"
          minLength={10}
          placeholder="Escribenos un mensaje y te responderemos cuanto antes"
          disableAutosize
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          style={{ width: "100%", color: "black" }}
          color="primary"
          onClick={() =>
            window.open(
              `https://wa.me/55971705?text=${encodeURIComponent(message)}`
            )
          }
        >
          Enviar Mensaje
        </Button>
      </div>

      <div className="copyright">
        © 2023 Apedir. Todos los derechos reservados.
      </div>
    </div>
  );
}
