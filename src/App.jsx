import "./App.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;