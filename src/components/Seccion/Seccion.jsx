import TituloDeSeccion from "./TituloDeSeccion";
import ListadoDeComponentesLugar from "./ListadoDeComponentesLugar";

export default function Seccion(){
    
    const section = {
        width: "100%",
        maxWidth: "1024px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
    return(
        <div className = "container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0 border-b border-divider backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70" >
            <section className = "section px-6" style={section}>
                <TituloDeSeccion title="Lugares Recomendados"></TituloDeSeccion>
                <ListadoDeComponentesLugar></ListadoDeComponentesLugar>
                
                
            </section>
        </div>
    );
}