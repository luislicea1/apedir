import React from 'react'
import Contact from "../Contact/Contact";
import Logo from '../../../assets/LogoBlancoApp.webp'
import { NegocioFooterSection, ImagenFooter } from "../../styles/styles";
import QR from '../../QR/QRCodeLogo';
import { grid_2_col_center} from '../../styles/styles';

export default function FooterNegocio(props) {
  
  return (
   
    <section style={NegocioFooterSection}>
        <Contact title = {props.title}></Contact>
        <div>
            <QR url = {props.url} imagen = {props.imagen} negocio ={"si"}></QR>
           
        </div>
        <a href="/">
            <img src={Logo} alt="" style={ImagenFooter}/>
        </a>
       
        
    </section>

  );
}
