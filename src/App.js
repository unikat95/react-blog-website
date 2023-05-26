import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { BlogProvider } from "./context/BlogContext";
import { ArticleProvider } from "./context/ArticleContext";
import { MessageProvider } from "./context/MessageContext";

import Root from "./Root";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import User from "./components/User/User";
import Articles from "./pages/Articles";

import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Account from "./pages/Account";
import DashUsers from "./pages/Dashboard/DashUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashArticles from "./pages/Dashboard/DashArticles";
import DashboardHome from "./pages/Dashboard/Home";
import Article from "./components/Article/Article";
import DashCreateArticle from "./pages/Dashboard/DashCreateArticle";
import EditArticle from "./components/EditArticle/EditArticle";
import Messages from "./pages/Messages";
import SendMessage from "./components/SendMessage/SendMessage";
import MessagesList from "./components/MessagesList/MessagesList";
import MessageDetail from "./components/MessageDetail/MessageDetail";
import SentMessages from "./components/SentMessages/SentMessages";
import IncomingMessage from "./components/IncomingMessage/IncomingMessage";
import Archive from "./components/Archive/Archive";

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
        <Route
          path="/messages"
          element={
            <ProtectedRoutes>
              <MessagesList />
            </ProtectedRoutes>
          }
        >
          <Route path="incoming-messages" index element={<IncomingMessage />} />
          <Route path="sent-messages" element={<SentMessages />} />
          <Route path="archive" element={<Archive />} />
          <Route path="send-message/:userId" element={<SendMessage />} />
          <Route path="msg/:msgId" element={<MessageDetail />} />
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
          <Route path="users" element={<DashUsers />} />
          <Route path="articles" element={<DashArticles />}></Route>
          <Route path="create-article" element={<DashCreateArticle />} />
          <Route path="edit-article/:editId" element={<EditArticle />} />
        </Route>
        <Route path="account" element={<Account />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:artId" element={<Article />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Route>
    )
  );

  return (
    <BlogProvider>
      <ArticleProvider>
        <MessageProvider>
          <RouterProvider router={router}></RouterProvider>
        </MessageProvider>
      </ArticleProvider>
    </BlogProvider>
  );
}

export default App;
