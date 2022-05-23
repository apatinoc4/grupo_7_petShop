import React from "react";
import Header from "../atoms/header/Header";
import Footer from "../atoms/Footer";

const Template = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Template;
