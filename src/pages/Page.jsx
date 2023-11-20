import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import Header from "../components/header/Header";
const Header = React.lazy(() => import("../components/header/Header"));

export default memo(function Page({ children }) {
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
});
