import React from "react";
import ProductHero from "../modules/views/ProductHero";
// import AppAppBar from '../modules/views/AppAppBar';
import PageValues from "../modules/views/PageValues";
import AppFooter from "../modules/views/AppFooter";

function NewHome() {
  return (
    <>
      {/* <AppAppBar /> */}
      <ProductHero />
      <PageValues />
      {/* <AppFooter /> */}
    </>
  );
}

export default NewHome;
