import PropTypes from "prop-types";
import Header from "../header/Header";

const containerStyle = {
  marginTop: "30px",
};

const sectionStyle = {
  width: "100%",
  maxWidth: "1024px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export default function Lugar({ nombre, localizacion }) {
  return (
    <>
      <Header></Header>

      <div
        style={containerStyle}
        className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <section className="section px-6" style={sectionStyle}>
          <h1>{nombre}</h1>
          <h1>{localizacion}</h1>
        </section>
      </div>
    </>
  );
}

Lugar.propTypes = {
  nombre: PropTypes.string.isRequired,
  localizacion: PropTypes.string.isRequired,
};
