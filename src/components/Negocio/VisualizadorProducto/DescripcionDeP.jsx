export default function DescripcionDeP(props){

    const glass = {
        width: "90%",
        marginTop: "20px",
        position: "absolute",
        bottom: "0px",
        height: "30vh",
        background: "rgba(150, 156, 161, 0.411)",
        borderRadius: "20px",
        marginBottom: "5%",
        padding: "10px",
        zIndex: "1000",
        border: "gray 1px solid"
    }
    const center = {
        display: "grid",
        placeItems: "center",
        width: "100%",
        color: "white",
        textAlign: "center"
    }
    const title ={
        color: "#69E4AF",
        fontWeight: "bold",
        fontSize: "30px"
    }

    return(
        <div style={glass} className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <div style={center}>
                <h2 style={title}>{props.title}</h2>
            </div>
            <div style={center}>
                <article>{props.text}</article>
            </div>
        </div>
    )
}