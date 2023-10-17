export default function TituloDeProductos(props){
    const style = {
        width: "100%", 
        marginTop: "30px", 
        marginBottom: "30px"
    }
    const fuente = {
        fontSize: "30px",
        fontWeight: "bold"
    }
    return(
        <div id="props.titulo" style={style} className="mb-2">
            <h2 style={fuente}> {props.title}</h2>
        </div>
    );
}