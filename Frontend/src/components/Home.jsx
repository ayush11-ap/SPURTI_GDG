import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../Pages/HeroSection";
import PlatformInfo from "../Pages/PlatformInfo";
import SubmitChallenge from "../Pages/SubmitChallenge";
import BecomeContributor from "../Pages/BecomeContributor";
import Footer from "../Pages/Footer";
import VerifyProblem from "./VerifyProblem";
import Stories from "../Pages/Stories";
const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the state contains scrollToStories
    if (location.state?.scrollToStories) {
      const element = document.getElementById("StoriesOfImpact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-red-50 text-black">
      <HeroSection />
      <PlatformInfo />
      <div id="StoriesOfImpact">
        <Stories />
      </div>
      <SubmitChallenge />
      <BecomeContributor />
      <Footer />
      {/* <VerifyProblem /> */}
    </div>
  );
};

export default Home;
