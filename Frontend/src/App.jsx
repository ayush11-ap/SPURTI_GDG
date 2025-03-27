import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import ProblemSubmissionForm from "./components/ProblemSubmissionForm";
import VerifyProblem from "./components/VerifyProblem";
import ProblemPostsPage from "./components/ProblemPostsPage";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar is globally visible */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/submit-problem" element={<ProblemSubmissionForm />} />
        <Route path="/verify-problem" element={<VerifyProblem />} />
        <Route path="/problem-posts" element={<ProblemPostsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
