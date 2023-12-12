import Seccion from "../components/Seccion/Seccion";
import SeccionEventos from "../components/Eventos/SeccionEventos";
import React from "react";
import { useHref } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Home() {
  const history = useHref();

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
      <Seccion title="Lugares"></Seccion>
      <Toaster richColors theme="dark" duration={3000} position="bottom-center" />
    </div>
  );
}
