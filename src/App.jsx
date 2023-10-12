import "./App.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <NextUIProvider>
<<<<<<< HEAD
      <Header></Header>
      <Seccion title="Lugares Recomendados" lugares = {lugaresRecomendados}></Seccion>
      <Seccion title="Lugares" lugares = {lugares}></Seccion>
      <Seccion title="Otros Lugares" lugares = {lugares}></Seccion>
      {/* <Login></Login> */}
=======
      <RouterProvider router={router} />
>>>>>>> 5d08c1725bcc80533b8e6766f96c81cdfcb35828
    </NextUIProvider>
  );
}

export default App;
