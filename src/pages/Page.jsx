import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/header/Header";

export default function Page({ children }) {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="pagina de promocion de negocios en cuba"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/logo.svg"
          alt="logo apedir"
        />
      </Helmet>
      <Header />
      {children}
    </div>
  );
}