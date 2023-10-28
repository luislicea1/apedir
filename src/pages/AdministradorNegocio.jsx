import { lazy, Suspense } from "react";
import Header from "../components/header/Header";

import { CircularProgress } from "@nextui-org/react";
import CrearNegocio from "../components/AdministradorNegocios/CrearNegocio";

const sectionStyle = {
  width: "100%",
  //maxWidth: "100vw",
  maxWidth: "900px",
  display: "grid",
  gridTemplateColumns: "repeat(1,1fr)",
  //gap: "10px"
};


export default function AdministradorNegocio() {
  return (
    <div>
      <Header></Header>
      <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
        <section style={sectionStyle}>
          <CrearNegocio />
        </section>
      </div>
    </div>
  );
}
