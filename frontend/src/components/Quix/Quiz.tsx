import { useState, useEffect } from "react";
import Questions from "./Questions";
import Timer from "../../utils/Timer";
import GameOver from "./GameOver";
import { axiosInstance } from "../../lib/axios";

interface QuizProps {
  setStep: (step: number) => void;
}

const Quiz = ({ setStep }: QuizProps) => {
  interface Question {
    question: string;
    options: string[];
    answer: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const fetchQuestions = async () => {
    try {
      const response = await axiosInstance.get("/questions/questions");
      console.log("Fetched questions:", response.data); // Debugging log
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);

    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 5); // Add 5 points for correct answer
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15); // Reset timer
      } else {
        setIsQuizFinished(true);
        sendScoreToBackend(score);
      }
    }, 1000); // 1-second delay before moving to the next question
  };

  const handleTimeUp = () => {
    setUserAnswers([...userAnswers, "No Answer"]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer
    } else {
      setIsQuizFinished(true);
      sendScoreToBackend(score);
    }
  };

  const sendScoreToBackend = async (finalScore: number) => {
    const username = localStorage.getItem("username");
    try {
      await axiosInstance.post("/users/update-score", {
        username,
        score: finalScore,
      });
    } catch (error) {
      console.error("Error sending score to backend:", error);
    }
  };

  const handlePlayAgain = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizFinished(false);
    setTimeLeft(15);
    setScore(0);
    fetchQuestions();
  };

  if (isQuizFinished) {
    return (
      <GameOver score={score} onPlayAgain={handlePlayAgain} setStep={setStep} />
    );
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-purple-600 h-screen border-gray-400 rounded-2xl p-2 xl:px-4">
      {isQuizFinished ? (
        <GameOver
          score={score}
          onPlayAgain={handlePlayAgain}
          setStep={setStep}
        />
      ) : (
        <div>
          <Timer duration={timeLeft} onTimeUp={handleTimeUp} />
          {questions.length > 0 && (
            <Questions
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswerSelected={handleAnswerSelect}
              correctAnswer={questions[currentQuestionIndex].answer}
              selectedAnswer={userAnswers[currentQuestionIndex]}
              timeLeft={timeLeft}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
