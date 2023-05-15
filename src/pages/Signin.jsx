import React, { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import SignNav from "../components/SignNav/SignNav";
import SignForm from "../components/SignForm/SignForm";

export default function Signin() {
  const { signIn } = useContext(BlogContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SignNav />
      <SignForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        value={"Sign In"}
        title={"Account Login"}
      />
    </>
  );
}
