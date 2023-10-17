import React from "react";
import {Avatar} from "@nextui-org/react";

export default function Logo(props) {

    const styles = {
        width: '100%',
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
        
    }

    const avatar = {
        width: "100px",
        height: "100px",
        marginLeft: "10px",
        marginRight: "20px"
    }

    const green = {
        color: "green"
    }

    const red = {
        color: "red"
    }

    const tituloContainer = {
        marginTop: "10px"
    }
  return (
    <div style={styles}>
        <Avatar isBordered color="default" src={props.logo} style={avatar}/>
        <div style={tituloContainer}>
            {props.estado === "Abierto" ? <h2 style={green}>Abierto</h2>:<h2 style={red}>Cerrado</h2>}
            <h2>{props.nombre}</h2>
        </div>
    </div>
    
  );
}