import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <button type="button" onClick={logOut}>
        Logout
      </button>
    </div>
  );
};

export default Home;
