const grid = {
    display: 'grid',
    placeItems: "start",
    
    //position: "absolute",
    ///bottom: "50vh",
    zIndex: "50",
    width: "90%"
    
}
const grid2 = {
    display: 'grid',
    placeItems: 'center',
    width: "100%"
    
}
const white = {
    fontSize: "2rem",
    color: "white"
}

export default function TituloEvento(props){
    return(
        <div style={grid}>
            <h2 style={white}>
                {props.title}
            </h2>
        </div>
    );
}