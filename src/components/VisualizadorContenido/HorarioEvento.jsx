import CalendarioIcon from "../Icons/Calendario/CalendarioIcon";
import RelojIcon from "../Icons/Reloj/RelojIcon";

const grid = {
    display: 'grid',
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
    //position: "absolute",
   // bottom: "45vh",
    zIndex: "50",
    placeItems: 'center',
    width: "90%",
    
}
const grid2 = {
    
    width: "100%",
    display: "flex",
    flexDirection: "row",

}
const white = {
    color: "white",
    marginLeft: "20px",
}

export default function HorarioEvento(props){
    return(
        <div style={grid}>
            <div style={grid2}>
                <CalendarioIcon color = {"white"} w = {"36px"}></CalendarioIcon>
                <h2 style={white}> 34/6/2002</h2>
               
            </div>
            <div style={grid2}>
                <RelojIcon color = {"white"} w = {"36px"}></RelojIcon>
                <h2 style={white}> 12:00 1:00</h2>
               
            </div>
        </div>
    );
}