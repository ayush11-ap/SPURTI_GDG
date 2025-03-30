import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./HeroSection";
import PlatformInfo from "./PlatformInfo";
import SubmitChallenge from "./SubmitChallenge";
import BecomeContributor from "./BecomeContributor";
import Footer from "./Footer";
import VerifyProblem from "./VerifyProblem";
import Stories from "./Stories";
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
