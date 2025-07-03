import React from "react";
import { Navbar } from "../components/organisms/Navbar/Navbar";
import { HomePage } from "../pages/HomePage/HomePage";

export const Root = () => {
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
};
