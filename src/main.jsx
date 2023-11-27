// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
// import {NextUIProvider} from '@nextui-org/react'
import App from "./App";
import AppWrapper from "./AppWrapper";
//import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <NextUIProvider> */}
    <main className="light text-foreground bg-background">
      <AppWrapper>
        <App />
      </AppWrapper>
    </main>
    {/* </NextUIProvider> */}
  </React.StrictMode>
);
