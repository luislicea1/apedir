import './App.css'
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import Prueba from './components/prueba/prueba';

function App() {
  
  return (
    <NextUIProvider>
      <div className='div'><Prueba></Prueba></div>
      
    </NextUIProvider>
  );
}

export default App
