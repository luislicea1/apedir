import './App.css'
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import Header from './components/header/Header';
import Seccion from './components/Seccion/Seccion';
import { lugares } from './components/Lugares/Lugares';
import { lugaresRecomendados } from './components/Lugares/LugaresRecomendados';

function App() {
  
  return (
    <NextUIProvider>
      <Header></Header>
      <Seccion title="Lugares Recomendados" lugares = {lugaresRecomendados}></Seccion>
      <Seccion title="Lugares" lugares = {lugares}></Seccion>
      <Seccion title="Otros Lugares" lugares = {lugares}></Seccion>
      
    </NextUIProvider>
  );
}

export default App
