import React, { use, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Services from "./Services";
import AboutTimeline from "./AboutTimeline";
import CaseStudies from "./CaseStudies";
import Contact from "./Contact";
import Footer from "./Footer";
import Insights from "./Insights";
import { useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { setAuthenticate, setToken } from "./redux/authSlice";
import getallcaseblog from "./hookes/getallcaseblog";
import getAllInsights from "./hookes/getallinsight";
import getallcontact from "./hookes/getallcontact";
import getallusers from "./hookes/getAllUsers";
import useGetallusers from "./hookes/getAllUsers";
import useGetallcaseblog from "./hookes/getallcaseblog";
import useGetAllInsights from "./hookes/getallinsight";
import useGetallcontact from "./hookes/getallcontact";

const Home = () => {
  useGetallusers();
  useGetallcaseblog();
  useGetAllInsights();
  useGetallcontact();

  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getallusers(dispatch);
  //   getallcaseblog(dispatch);
  //   getAllInsights(dispatch);
  //   getallcontact(dispatch);
  // }, [dispatch]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
    const tokenLocal = localStorage.getItem("token", token);
    if (tokenLocal) {
      dispatch(setToken(tokenLocal));
      dispatch(setAuthenticate(true));
    }
  }, [token]);
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <Navbar />
      <Hero />
      <Services />
      <AboutTimeline />
      <CaseStudies />
      <Insights />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
