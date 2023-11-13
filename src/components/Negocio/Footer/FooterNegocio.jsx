import React from 'react'
import Contact from "../Contact/Contact";
import Logo from '../../../assets/LogoBlancoApp.webp'
import { NegocioFooterSection, ImagenFooter } from "../../styles/styles";

export default function FooterNegocio(props) {
  
  return (
   
    <section style={NegocioFooterSection}>
        <Contact title = {props.title}></Contact>
        <a href="/">
            <img src={Logo} alt="" style={ImagenFooter}/>
        </a>
        
    </section>

  );
}
