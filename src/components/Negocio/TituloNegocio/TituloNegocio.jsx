

export default function TituloNegocio(props){

    const styles = {
        fontSize: "30px",
    }
    return(
        <h2 style={styles} className="mt-2">
            {props.title}
        </h2>
    );
}