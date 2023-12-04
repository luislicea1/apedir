import React from "react";
import { grid_1_col_center} from "../styles/styles";
import './addCategory.css'
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function CambioDePaquete(props){

    const fuente = {
        fontSize: "3rem",
        lineHeight: "1",
        fontWeight: "600",
        
    }

    return(
        <div style={{...grid_1_col_center, padding: "20px 20px 40px 20px"}}>

            <div style={{display: "flex", gap: "10px"}}>
                <h2 style={fuente}>Paquete </h2>
                <span  
                    className = {props.paquete == "Premium" ? "category-type-text-color-premium" : props.paquete == "Basico" ?"category-type-text-color-basico" : "category-type-text-color-gratis"} 
                    style={fuente}
                >
                    {props.paquete}.
                </span>
            </div>
            
            <div style={{gap: "10px", display: "flex"}}>
                <Link to={'/plans'} aria-label={"negocio"}>
                    <Button>
                        Cambiar de paquete
                    </Button>
                </Link>
                <Link to={'/plans'} aria-label={"negocio"}>
                    <Button>
                        Contactenos
                    </Button>
                </Link>
            </div>
            
            {/* <a href="/plans">Cambiar de paquete</a> */}
           
        </div>
    );
}