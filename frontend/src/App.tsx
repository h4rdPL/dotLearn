import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/Error";
import { HomePage } from "./pages/HomePage/HomePage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { CarrerPage } from "./pages/CarrerPage/CarrerPage";
import { Offer } from "./pages/CarrerDetailPage/Offer";
import { ContactPage } from "./pages/ContactPage/ContactPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { DashboardPage } from "./pages/Platform/DashboardPage/DashboardPage";
import { AIPage } from "./pages/Platform/AIPage/AIPage";
import { LearnPage } from "./pages/Platform/LearnPage/LearnPage";
import { TestPage } from "./pages/Platform/TestPage/TestPage";
import { ClassPage } from "./pages/Platform/ClassPage/ClassPage";
import { SettingPage } from "./pages/Platform/SettingPage/SettingPage";
import { CreateFlashCards } from "./pages/Platform/CreateFlashCards/CreateFlashCards";
import { FlashCardDetails } from "./pages/Platform/FlashCardDetails/FlashCardDetails";
import { CreateTestPage } from "./pages/Platform/CreateTestPage/CreateTestPage";
import { CreateClassPage } from "./pages/Platform/CreateClassPage/CreateClassPage";
import { ClassPageDetail } from "./pages/Platform/ClassPageDetail/ClassPageDetail";
import { TestPageDetail } from "./pages/Platform/TestPageDetail/TestPageDetail";
import { ReactNode, useState } from "react";
import { UserProvider } from "./pages/Context/UserContex";
import { AddToClassPage } from "./pages/Platform/AddToClassPage/AddToClassPage";

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
  {
    path: "/platform/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/class",
    element: <ClassPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/test",
    element: (
      <TestPage
        Id={""}
        TestName={""}
        Time={""}
        IsActive={false}
        ActiveDate={""}
        ProfessorFirstName={""}
        ProfessorLastName={""}
        Questions={[]}
        $values={""}
        map={function (arg0: (question: any) => any): ReactNode {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/learn",
    element: <LearnPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/ai",
    element: <AIPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/settings",
    element: <SettingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/learn/create",
    element: <CreateFlashCards />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/learn/:flashCardId",
    element: <FlashCardDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/test/create",
    element: <CreateTestPage />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/platform/test/:testId",
    element: <TestPageDetail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/class/create",
    element: <CreateClassPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/class/addToClass",
    element: <AddToClassPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/platform/class/:classId",
    element: <ClassPageDetail />,
    errorElement: <ErrorPage />,
  },
]);
export const App = () => {
  const [user, setUser] = useState<string>("");
  return (
    <>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </>
  );
};
