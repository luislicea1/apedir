import PropTypes from "prop-types";
import Imagen from "../../assets/fondo/restaurant.jpg";
import LogoImg from "../../assets/img/img (1).png";
import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import PortadaDeNegocio from "../Negocio/PortadaDeNegocio/portadaNegocio";
import TituloNegocio from "../Negocio/TituloNegocio/TituloNegocio";
import DescripcionNegocio from "../Negocio/Descripcion/Descripcion";

const sectionStyle = {
    width: "100%",
    maxWidth: "735px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto reprehenderit vel! Recusandae distinctio laboriosam optio, quam at vero iure! Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nobis quam laboriosam eveniet voluptatibus iste esse, consectetur iure distinctio, iusto repr";
  

export default function NegocioGratuito({ nombre, localizacion }) {
  return (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <section style={sectionStyle}>
        <HeaderNegocio
          logo={LogoImg}
          nombre={nombre}
          horario={"si"}
          anterior={"/"}
        ></HeaderNegocio>

        <section className="section" style={sectionStyle}>
          <PortadaDeNegocio imagenPortada={Imagen}></PortadaDeNegocio>
          <div className="p-2 m-2">
            <TituloNegocio title={nombre}></TituloNegocio>
            <DescripcionNegocio descripcion={text} contact = {"si"} domicilio = {"no"} localizacion = {"si"} like = {"no"}></DescripcionNegocio>

           
          </div>
        </section>
      </section>
    </div>
  );
}
