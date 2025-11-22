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
import UserProfile from "./components/Profile";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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
      path: "/profile",
      element: <UserProfile />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "users",
          element: (
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cases",
          element: (
            <ProtectedRoute>
              <CaseStudiesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "insights",
          element: (
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "messages",
          element: (
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cases/add",
          element: (
            <ProtectedRoute>
               <AddCaseStudy />
            </ProtectedRoute>
          ),
        },
        {
          path: "insights/add",
          element: (
            <ProtectedRoute>
              <AddInsight />
            </ProtectedRoute>
          ),
        },
        {
          path: "cases/edit/:id",
          element: (
            <ProtectedRoute>
              <EditCaseStudy />
            </ProtectedRoute>
          ),
        },
        {
          path: "insights/edit/:id",
          element: (
            <ProtectedRoute>
              <EditInsight />
            </ProtectedRoute>
          ),
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
