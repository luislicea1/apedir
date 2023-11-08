import React from 'react'
import TituloDeSeccion from "./TituloDeSeccion";
import ListadoDeComponentesLugar from "./ListadoDeComponentesLugar";
import ComponenteLugar from "./ComponenteLugar";
import {container,section} from "../styles/styles"

export default function Seccion(props){
    
    return(
        <div style= {container} className = "container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70" >
            <section className = "section px-6" style={section}>
                <TituloDeSeccion title={props.title}></TituloDeSeccion>
                <ListadoDeComponentesLugar lugares = {props.lugares} ></ListadoDeComponentesLugar>
            </section>
        </div>
    );
}