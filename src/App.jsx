import React, { Suspense } from "react";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <Suspense>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Suspense>
  );
}

export default App;
