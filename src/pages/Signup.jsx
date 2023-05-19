import React, { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import { useNavigate } from "react-router-dom";
import SignNav from "../components/SignNav/SignNav";
import SignForm from "../components/SignForm/SignForm";

export default function Signup() {
  const { createUser, setLoading } = useContext(BlogContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      try {
        await createUser(email, password);
        navigate("/profile");
      } catch (error) {
        console.log(error.code);
        setError(true);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <SignNav />
      <SignForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
        value={"Sign Up"}
        title={"Create account"}
        error={error}
        setError={setError}
      />
    </>
  );
}
