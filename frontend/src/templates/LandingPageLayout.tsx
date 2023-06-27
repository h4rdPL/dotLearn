import React from "react";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { Footer } from "../components/organisms/Footer/Footer";

export const LandingPageLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
