import { Image } from "@nextui-org/react";
import "./visualizarProducto.css";

export default function ImagenVisualizador(props){
    const img = {
        maxHeight: "70vh",
        width: "100%",
        borderRadius: "0px",
        objectFit: "contain",
     
      };
    
      const center = {
        width: "100%",
        height: "70vh",
        maxHeight: "70vh",
        display: "grid",
        placeItems: "start",
        position:"relative",
        justifyContent: "center",
        //background: "red"
      };
      const background = {
        background: "linear-gradient(#0e131700,#0E1317,#0E1317)",
        
        position: "absolute",
        bottom: "0",
        zIndex: "30",
       // height : "40vh",
        width: "100%"

      }
      
      return (
        <div style={center}>
          <Image
            isBlurred
            style={img}
            src={props.image}
            alt="NextUI Album Cover Image with delay"
            classNames="m-5"
          />
          <div  className="bgtransparent"></div>
        </div>
    );
}
