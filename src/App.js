import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BlogProvider } from "./context/BlogContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Account from "./pages/Account";
import Users from "./pages/Dashboard/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import Articles from "./pages/Dashboard/Articles";
import DashboardHome from "./pages/Dashboard/Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="account" element={<Account />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="articles" element={<Articles />} />
        </Route>
      </Route>
    )
  );

  return (
    <BlogProvider>
      <RouterProvider router={router}></RouterProvider>
    </BlogProvider>
  );
}

export default App;
