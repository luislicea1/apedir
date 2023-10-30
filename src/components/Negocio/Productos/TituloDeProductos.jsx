import { FontBold30px } from "../../styles/styles";

export default function TituloDeProductos(props){
    const style = {
        width: "100%", 
        marginTop: "30px", 
        marginBottom: "30px"
    }
    return(
        <div id={props.title} style={style} className="mb-2">
            <h2 style={FontBold30px}> {props.title}</h2>
        </div>
    );
}