import React, { lazy, Suspense } from "react";
//import Header from "../components/header/Header";

import { CircularProgress } from "@nextui-org/react";
//import ComprasSection from "../components/CompraPagos/ComprasSection";

const sectionStyle = {
  width: "100%",
  //maxWidth: "100vw",
  maxWidth: "900px",
  display: "grid",
  gridTemplateColumns: "repeat(1,1fr)",
  //gap: "10px"
};

const Header = lazy(()=>import ('../components/header/Header'))
const ComprasSection = lazy(()=> import("../components/CompraPagos/ComprasSection"));
const renderLoader = () => <p>Loading</p>;

export default function Compras() {
  return (
    <div>
      <Suspense>
        <Header></Header>
      </Suspense>
      <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
        <section style={sectionStyle}>
          <Suspense>
              <ComprasSection></ComprasSection>
          </Suspense>  
        </section>
      </div>
    </div>
  );
}
