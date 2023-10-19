import Like from "../../Like/Like"
import CampanaIcon from "../../Icons/Campana/CampanaIcon"
import RelojIcon from "../../Icons/Reloj/RelojIcon"
import { Card } from "@nextui-org/react"

export default function PromoProducto(props){

    const glass = {
        width: "90%",
        //marginTop: "20px",
        position: "absolute",
        bottom: "34.5vh",
        height: "11vh",
        background: "rgba(150, 156, 161, 0.411)",
        borderRadius: "20px",
        //margin: "0% 5% 0% 5%",
        padding: "10px",
        zIndex: "1000",
        border: "gray 1px solid"
    }
    const center = {
        display: "grid",
        gridTemplateColumns: 'repeat(3,1fr)',
        placeItems: "center",
        width: "100%",
        color: "white",
        textAlign: "center"
    }

    const card ={
        width: "40px",
        height: "40px",
        display: "grid",
        placeItems: "center",
        borderRadius: "50%"

    }
    const title ={
        color: "#69E4AF",
        fontWeight: "bold",
        fontSize: "30px"
    }

    return(
        <div style={glass} className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <div style={center}>
                <Like></Like>
                <Card style={card}>
                    <RelojIcon w={"26px"}></RelojIcon>
                </Card>
                <Card style={card}>
                    <CampanaIcon w={"26px"}></CampanaIcon>
                </Card>
                
                <h2>33</h2>
                <h2>20 min</h2>
                <h2></h2>
            </div>
        </div>
    )
}