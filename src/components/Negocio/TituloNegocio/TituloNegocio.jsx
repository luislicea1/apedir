import React from 'react'
import { FontBold40px } from "../../styles/styles";

export default function TituloNegocio(props){

    return(
        <h2 style={FontBold40px} className="mt-2">
            {props.title}
        </h2>
    );
}