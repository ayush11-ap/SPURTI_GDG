import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ProblemSubmissionForm from "./components/ProblemSubmissionForm";
import VerifyProblem from "./components/VerifyProblem";
import ProblemPostsPage from "./components/ProblemPostsPage";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          {/* Navbar is globally visible */}
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit-problem" element={<ProblemSubmissionForm />} />
            <Route path="/verify-problem" element={<VerifyProblem />} />
            <Route
              path="/problem-posts"
              element={
                <Suspense>
                  <ProblemPostsPage />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
