import React, { useState } from 'react';

export default function OrdenarProducto(props){
    const [cantidad, setCantidad] = useState(0);
    const incrementar = () => {
        setCantidad(cantidad + 1);
    }
    
    const disminuir = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    }
    

    const glass = {
        width: "150px",
        marginTop: "20px",
        position: "absolute",
        bottom: "47vh",
        height: "50px",
        background: "rgba(150, 156, 161, 0.411)",
        borderRadius: "20px",
        margin: "0% 5% 0% 5%",
        padding: "10px",
        zIndex: "1000",
        border: "gray 1px solid"
    }
    const btn = {
        background: "white",
        color: "black",
        borderRadius: "50%",
        border: "none",
        width: "30px",
        height: "30px",
        display: "grid",
        placeItems: "center",
    }
    const center = {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        placeItems: "center",
        width: "100%",
        color: "white",
        textAlign: "center"
    }
    const title ={
        color: "#69E4AF",
        fontWeight: "bold",
        fontSize: "30px"
    }

    return(
        <div style={glass} className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <div style={center}>
                <button style = {btn} onClick={disminuir}>
                  -
                </button>
                {cantidad} 
                <button style = {btn} onClick={incrementar}>
                  +
                </button>
            </div>
        </div>
    )
}
