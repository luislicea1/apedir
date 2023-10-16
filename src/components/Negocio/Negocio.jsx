import PropTypes from "prop-types";
import Header from "../header/Header";
import Imagen from "../../assets/img/img (1).jpg"
import LogoImg from "../../assets/img/img (1).png"
import PortadaDeNegocio from "./PortadaDeNegocio/portadaNegocio";
import Logo from "./Logo/Logo";

const containerStyle = {
  marginTop: "0px",
};

const sectionStyle = {
  width: "100%",
  maxWidth: "735px",
  maxWidth: "990px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  
};

const gridPresentation = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)"
}

export default function Negocio({ nombre, localizacion }) {
  return (
    <>
      <Header></Header>
      <div style={containerStyle} className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
        <section className = "section " style={sectionStyle}>
          <div style={gridPresentation}>
            {/* <PortadaDeNegocio imagenPortada={Imagen}></PortadaDeNegocio> */}
            <Logo logo = {LogoImg} nombre = {nombre} estado = "Abierto" localizacion = {localizacion}></Logo>
          </div>
            
        </section>
        
        
   
      </div>
    </>
  );
}

Negocio.propTypes = {
  nombre: PropTypes.string.isRequired,
  localizacion: PropTypes.string.isRequired,
};
