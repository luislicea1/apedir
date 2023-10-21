import { Image } from "@nextui-org/react";


const mapa = {
    //position: "absolute",
    zIndex: "40",
    width: "90%",
    //bottom: "5vh"
}
export default function Mapa(){
    return(
        <div style={mapa}>
            <Image
                src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg"
            >

            </Image>
        </div>
    );
}