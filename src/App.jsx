import Home from "./components/Home";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLayout from "./components/admin/AdminLayout";
import UsersPage from "./components/admin/UsersPage";
import CaseStudiesPage from "./components/admin/CaseStudiesPage";
import InsightsPage from "./components/admin/InsightsPage";
import MessagesPage from "./components/admin/MessagesPage";
import AddCaseStudy from "./components/admin/AddCaseStudy";
import AddInsight from "./components/admin/AddInsight";
import EditCaseStudy from "./components/admin/EditCaseStudy";
import EditInsight from "./components/admin/EditInsight";
import AllCaseStudies from "./components/AllCaseStudies";
import AllInsights from "./components/AllInsights";
import CaseStudyDetail from "./components/CaseStudyDetail";
import InsightDetail from "./components/InsightDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        { path: "users", element: <UsersPage /> },
        { path: "cases", element: <CaseStudiesPage /> },
        { path: "insights", element: <InsightsPage /> },
        { path: "messages", element: <MessagesPage /> },
        { path: "cases/add", element: <AddCaseStudy /> },
        { path: "insights/add", element: <AddInsight /> },
        { path: "cases/edit/:id", element: <EditCaseStudy /> },
        {
          path: "insights/edit/:id",
          element: <EditInsight />,
        },
      ],
    },
    {
      path: "/cases",
      element: <AllCaseStudies />,
    },
    {
      path: "/insights",
      element: <AllInsights />,
    },
    {
      path: "/case/:id",
      element: <CaseStudyDetail />,
    },
    {
      path: "/insight/:id",
      element: <InsightDetail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
