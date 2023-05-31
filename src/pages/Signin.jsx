import React, { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import SignNav from "../components/SignNav/SignNav";
import SignForm from "../components/SignForm/SignForm";

export default function Signin() {
  const { signIn, setLoading, user } = useContext(BlogContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/profile");
    } catch (error) {
      setError(true);
      setLoading(false);
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
        error={error}
        setError={setError}
      />
    </>
  );
}
