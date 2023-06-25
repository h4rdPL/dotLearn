import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Roots";
import ErrorPage from "./pages/ErrorPage/Error";
import { HomePage } from "./pages/HomePage/HomePage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { MainTemplate } from "./templates/MainTemplate";
import { CarrerPage } from "./pages/CarrerPage/CarrerPage";
import { Offer } from "./pages/CarrerDetailPage/Offer";
import { ContactPage } from "./pages/ContactPage/ContactPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/carrer",
    element: <CarrerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/carrer/:carrerId",
    element: <Offer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
]);
export const App = () => {
  return (
    <>
      <MainTemplate>
        <RouterProvider router={router}></RouterProvider>
      </MainTemplate>
    </>
  );
};
