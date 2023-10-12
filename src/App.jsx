import './App.css'
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import Header from './components/header/Header';
import Seccion from './components/Seccion/Seccion';


function App() {
  
  return (
    <NextUIProvider>
      <Header></Header>
      <Seccion></Seccion>
      
    </NextUIProvider>
  );
}

export default App
