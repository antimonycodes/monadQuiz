import { useState } from "react";
import { motion } from "framer-motion";
import Quiz from "../components/Quix/Quiz";
import Homepage from "./Homepage";
import bg1 from "../assets/bg1.webp";
import bg2 from "../assets/bg2.webp";
import bg3 from "../assets/bg3.webp";
import bg4 from "../assets/bg4.webp";
import bg5 from "../assets/bg5.webp";

const backgrounds = [
  { src: bg1, style: "top-12 left-12" },
  { src: bg2, style: "top-12 right-12" },
  { src: bg3, style: "top-[45%] left-[15%]" },
  { src: bg4, style: "bottom-12 left-12" },
  { src: bg5, style: "bottom-12 right-12" },
];

const QuizScreen = () => {
  const [step, setStep] = useState(1);

  const handlePlayClick = () => {
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-black p-4 relative overflow-hidden">
      {/* Animated Backgrounds */}
      {backgrounds.map((bg, index) => (
        <motion.img
          key={index}
          src={bg.src}
          alt={`bg${index + 1}`}
          className={`absolute size-32 hidden xl:block object-cover ${bg.style}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
            delay: index * 1.2, // Different delay for each image
          }}
        />
      ))}

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {step === 1 ? (
          <Homepage onPlayClick={handlePlayClick} />
        ) : (
          <Quiz setStep={setStep} />
        )}
      </div>
    </div>
  );
};

export default QuizScreen;
