import React, { useContext, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return navigate("/auth");
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
