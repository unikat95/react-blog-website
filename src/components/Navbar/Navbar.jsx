import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BlogContext from "../../context/BlogContext";

export default function Navbar() {
  const { user } = useContext(BlogContext);

  return (
    <>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/profile">Profle</Link>
            </li>
          )}
          {!user && (
            <>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
