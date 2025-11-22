import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null || user.email !== "admin@gmail.com") {
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
