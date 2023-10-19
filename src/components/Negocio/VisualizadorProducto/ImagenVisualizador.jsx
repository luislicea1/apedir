import { Image } from "@nextui-org/react";

export default function ImagenVisualizador(props){
    const img = {
        height: "100%",
        width: "100%",
        objectFit: "contain",
      };
    
      const center = {
        width: "100%",
        height: "50vh",
        maxHeight: "50vh",
        display: "grid",
        placeItems: "center",
      };
      return (
        <div style={center}>
          <Image
            isBlurred
            style={img}
            src={props.image}
            alt="NextUI Album Cover Image with delay"
            classNames="m-5"
          />
        </div>
    );
}
