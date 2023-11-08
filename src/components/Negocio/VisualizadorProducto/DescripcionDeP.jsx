import React from 'react'
import { Button } from "@nextui-org/react"

export default function DescripcionDeP(props){

    const glass = {
        width: "90%",
        position: "absolute",
        bottom: "0px",
        height: "32vh",
        background: "rgba(150, 156, 161, 0.411)",
        borderRadius: "20px",
        marginBottom: "3%",
        padding: "10px",
        zIndex: "1000",
        border: "gray 1px solid"
    }
    const center = {
        display: "grid",
        placeItems: "center",
        width: "100%",
        color: "white",
        textAlign: "center"
    }
    const centertext = {
        display: "grid",
        placeItems: "center",
        width: "100%",
        color: "white",
        textAlign: "center",
        height: "15vh",
        overflowY: "scroll"
    }
    const title ={
        color: "#FFD600",
        fontWeight: "bold",
        fontSize: "30px"
    }

    const btn = {
        marginTop: "15px",
        width: "95%",
        
    }

    const handleClick = () => {
        props.onAddToCart({ title: props.title, quantity: props.cantidad });
      };

    return(
        <div style={glass} className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <div style={center}>
                <h2 style={title}>{props.title}</h2>
            </div>
            <div style={centertext}>
                <article>{props.text}</article>
            </div>

            <Button color="primary" style={btn} onClick={handleClick}>Agregar al Carrito</Button>
        </div>
    )
}