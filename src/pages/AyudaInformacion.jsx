import Header from "../components/header/Header";
import { grid_1_col, container, section } from "../components/styles/styles";
import AyudaInformacionContainer from "../components/AyudaInformacion/AyudaInformacionContainer";


export default function AyudaInformacion() {
    return (
        <div>
          <Header/>
          <div style= {container} className = "container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70" >
            <section className = "section px-6" style={section}>
                <AyudaInformacionContainer></AyudaInformacionContainer>
            </section>
        </div>
        </div>
    );
}