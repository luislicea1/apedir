import React ,{lazy}from 'react'
import Header from "../components/header/Header";
//import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
//import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";
import { lugares } from '../components/Lugares/Lugares';
import SeccionEventos from "../components/Eventos/SeccionEventos";
import { eventos } from "../components/Lugares/Eventos";
//import Seccion from '../components/Seccion/Seccion';
import { Helmet } from 'react-helmet';

const Seccion = lazy(()=> import('../components/Seccion/Seccion'));

export default function Home() {
    return (
    <div>
      <Helmet>
        <meta name='description' content='pagina de promocion de negocios en cuba'/>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" alt="logo apedir"/>
      </Helmet>
      <Header></Header>
      {/* <SeccionEventos title = {"Eventos"} eventos = {eventos}></SeccionEventos>  */}
      {/* <SeccionMR
        title="Lugares Recomendados"
        lugares={lugaresRecomendados}
      ></SeccionMR> */}
      <Seccion title="Lugares 2" lugares={lugares} ></Seccion> 
      {/* <SeccionGratuita title="Otros Lugares" lugares={lugares} ></SeccionGratuita> */}
    </div>
  );
}
