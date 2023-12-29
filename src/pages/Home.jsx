import Seccion from "../components/Seccion/Seccion";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import React from "react";
import { Toaster, toast } from "sonner";
import SliderNovedades from "../components/Novedades/SliderNovedades";
import Footer from "../components/Footer/Footer";
import ProductosSliderHome from "../components/ProductosSliderHome/ProductosSliderHome";

export default function Home() {

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const errorParam = urlSearchParams.get("error");

    if (errorParam) {
      if (errorParam === "unauthorized_client") {
        toast.error("Error: Usuario baneado.");
      } else {
        toast.error("Error desconocido.");
      }
    }
  }, []);

  return (
    <div>
      <SeccionEventos title="Eventos"></SeccionEventos>
      <SliderNovedades></SliderNovedades>
      <ProductosSliderHome></ProductosSliderHome>
      <Seccion title="Lugares"></Seccion>
      <Toaster richColors theme="dark" duration={3000} position="bottom-center" />
      <Footer></Footer>
    </div> 
  );
}
