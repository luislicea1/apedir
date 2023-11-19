import {Spinner} from "@nextui-org/react";
import React from "react";
export default function Loader(){
    return(
        <div style={{width: "100%", display: "grid", placeItems: "center"}}>
             <Spinner color="secondary" label="Loading..." labelColor="secondary"/>
        </div>
    )
    
    
}