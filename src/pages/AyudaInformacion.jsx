import Header from "../components/header/Header";
import Seccion from "../components/Seccion/Seccion";
import SeccionMR from "../components/SeccionMasRecomendados/SeccionMR";
import { lugares } from "../components/Lugares/Lugares";
import { lugaresRecomendados } from "../components/Lugares/LugaresRecomendados";

export default function AyudaInformacion() {
    return (
        <div>
          <Header></Header>
          <div style= {container} className = "container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70" >
            <section className = "section px-6" style={section}>
                <TituloDeSeccion title="ayuda"></TituloDeSeccion>
                <ListadoDeComponentesLugar lugares = {props.lugares}></ListadoDeComponentesLugar>
            </section>
        </div>
        </div>
    );
}