

export default function TituloDeSeccion(props){

    const styles = {
        width:"100%",
        display: "flex",
        float: "left",
        marginBottom: "20px"
    }

    return(
        <div style={styles}>
            <h2>{props.title}</h2>
        </div>
    );
} 