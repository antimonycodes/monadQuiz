import { Route, Routes } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import QuizScreen from "./pages/QuizScreen";
import LeaderBoard from "./pages/LeaderBoard";
import { Toaster } from "react-hot-toast";
import SignIn from "./components/onboarding/SignIn";

// import {Toaster}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
