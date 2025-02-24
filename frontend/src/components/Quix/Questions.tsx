import React from "react";
import { ChevronLeft, Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestionProps {
  question: string;
  options: string[];
  onAnswerSelected: (answer: string) => void;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  timeLeft: number;
  questionNumber: number;
  totalQuestions: number;
}

const Questions: React.FC<QuestionProps> = ({
  question,
  options,
  onAnswerSelected,
  correctAnswer,
  selectedAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 bg-purple-60 rounded-2xl p-4">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center text-white mb-4">
          <button className="flex items-center" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <div className="flex-1 text-center font-bold">Quiz</div>
        </div>

        {/* Question Card */}
        <div className="relative bg-white rounded-lg py-8 px-4 shadow-md shadow-amber-400 mb-8">
          <div className="absolute right-4 top-4 text-sm font-bold">
            {`${questionNumber}/${totalQuestions}`}
          </div>
          <p className="text-gray-800 text-xl">{question}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {options.map((option) => {
            const isCorrect = option === correctAnswer;
            const isSelected = option === selectedAnswer;
            let buttonClass = "bg-white hover:bg-gray-50";

            if (selectedAnswer) {
              if (isCorrect) {
                buttonClass = "bg-green-500 text-white";
              } else if (isSelected) {
                buttonClass = "bg-red-500 text-white";
              }
            } else if (isSelected) {
              buttonClass = "bg-blue-500 text-white";
            }

            return (
              <button
                key={option}
                onClick={() => onAnswerSelected(option)}
                className={`w-full p-4 rounded-lg text-left font-bold text-sm transition-colors flex justify-between items-center ${buttonClass}`}
                disabled={!!selectedAnswer}
              >
                {option}{" "}
                {isSelected && <Hand size={5} style={{ width: "10px" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Questions;
