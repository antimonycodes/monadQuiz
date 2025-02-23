// import { useNavigate } from "react-router-dom";
import Quiz from "../components/Quix/Quiz";
import { useState } from "react";
import Homepage from "./Homepage";

const QuizScreen = () => {
  const [step, setStep] = useState(1);

  const handlePlayClick = () => {
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-md mx-auto">
        {step === 1 ? (
          <Homepage onPlayClick={handlePlayClick} />
        ) : (
          <div>
            <Quiz setStep={setStep} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
