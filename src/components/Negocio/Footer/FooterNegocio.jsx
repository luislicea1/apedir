import React from 'react'
import Contact from "../Contact/Contact";
//import Logo from '../../../assets/LogoBlancoApp.webp'
import { NegocioFooterSection, ImagenFooter } from "../../styles/styles";
import QR from '../../QR/QRCodeLogo';
//import { grid_2_col_center} from '../../styles/styles';
//import LogoCarritoNegro from '../../../assets/logoReduce/LogoCarritoNegro';
import LogoReduce from '../../../assets/logoReduce/LogoReduce';

export default function FooterNegocio(props) {
  
  
  return (
   
    <section style={NegocioFooterSection}>
        <Contact title = {props.title} idNegocio = {props.idNegocio}></Contact>
        <div>
            <QR url = {props.url} imagen = {props.imagen} negocio ={"si"}></QR>
           
        </div>
        <a href="/">
          <div style={{margin: "60px 0 160px 0"}}>
          <LogoReduce w= {100} color= "white" ></LogoReduce>
          </div>
            
            
        </a>
       
        
    </section>

  );
}
