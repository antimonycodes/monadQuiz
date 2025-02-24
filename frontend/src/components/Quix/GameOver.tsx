import React, { useEffect, useState, useRef } from "react";
import { Share, Trophy, X, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import "../Quix/globalstyles.css";
import useWindowSize from "../../lib/useWindowSize";
import MonadLogo from "../MonadLogo";

interface GameOverProps {
  score: number;
  onPlayAgain: () => void; // Add onPlayAgain prop
  setStep: (step: number) => void; // Add setStep prop
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  playerName?: string;
  totalQuestions?: number;
  timeSpent?: string;
  accuracy?: number;
  streak?: number;
  difficulty?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  score,
  playerName = "Player",
  timeSpent = "2:30",
  accuracy = 80,
  streak = 5,
  difficulty = "Medium",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateShareableImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#9810fa ");
    gradient.addColorStop(1, "#9810fa ");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(0, 200);
    ctx.fillStyle = "#fcd34d";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - 200, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 200);
    ctx.fillStyle = "#fcd34d";
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MONAD", canvas.width / 2, 120);
    ctx.font = "bold 40px Inter, sans-serif";
    ctx.fillStyle = "#fcd34d";
    ctx.fillText("Quiz", canvas.width / 2, 170);

    ctx.font = "48px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(playerName, canvas.width / 2, 250);

    ctx.font = "bold 120px Inter, sans-serif";
    ctx.fillStyle = "#4ade80";
    ctx.fillText(score.toString(), canvas.width / 2, 380);
    ctx.font = "36px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("points scored", canvas.width / 2, 430);

    const stats = [
      { label: "Accuracy", value: `${accuracy}%` },
      { label: "Streak", value: streak.toString() },
      { label: "Time", value: timeSpent },
      { label: "Difficulty", value: difficulty },
    ];

    ctx.font = "32px Inter, sans-serif";
    stats.forEach((stat, index) => {
      const x = (canvas.width / 4) * (index % 4) + canvas.width / 8;
      const y = 500;

      ctx.fillStyle = "#ffffff";
      ctx.fillText(stat.label, x, y - 10);
      ctx.fillText(stat.value, x, y + 30);
    });

    ctx.font = "36px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Try to beat my score!", canvas.width / 2, 580);
    ctx.fillStyle = "#fcd34d";
    ctx.fillText("/monadquiz.onrender.com", canvas.width / 2, 620);
  };

  useEffect(() => {
    if (isOpen) {
      generateShareableImage();
    }
  }, [isOpen]);

  const shareScore = async (platform: string) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const imageData = canvas.toDataURL("image/png");
      const shareText = `I scored ${score} points in MONAD Quiz!\nAccuracy: ${accuracy}%\nStreak: ${streak}\nDifficulty: ${difficulty}\n\nTry to beat my score! https://monadquiz.onrender.com/`;

      switch (platform) {
        case "whatsapp":
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(
              shareText
            )}&image=${encodeURIComponent(imageData)}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              shareText
            )}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}&quote=${encodeURIComponent(shareText)}`
          );
          break;
        case "download":
          const link = document.createElement("a");
          link.download = "monad-quiz-score.png";
          link.href = imageData;
          link.click();
          break;
        default:
          navigator.clipboard.writeText(shareText);
      }
    } catch (error) {
      console.error("Error sharing score:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-6 m-4 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Share Your Score</h2>
          <p className="text-gray-600">
            Let others know about your achievement!
          </p>
        </div>

        <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
          <canvas ref={canvasRef} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              name: "WhatsApp",
              platform: "whatsapp",
              color: "bg-green-500 hover:bg-green-600",
            },
            {
              name: "Twitter",
              platform: "twitter",
              color: "bg-blue-400 hover:bg-blue-500",
            },
            {
              name: "Facebook",
              platform: "facebook",
              color: "bg-blue-600 hover:bg-blue-700",
            },
            {
              name: "Download",
              platform: "download",
              color: "bg-gray-500 hover:bg-gray-600",
              icon: Download,
            },
          ].map((button) => (
            <button
              key={button.platform}
              onClick={() => shareScore(button.platform)}
              className={`${button.color} text-white rounded-lg py-3 px-4
                transform transition-all duration-300
                hover:scale-105 active:scale-95
                flex items-center justify-center gap-2
                group`}
            >
              {button.icon ? (
                <button.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <Share className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
              )}
              {button.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GameOver: React.FC<GameOverProps> = ({ score, setStep }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { width, height } = useWindowSize();
  // const navigate = useNavigate();

  const playerName = localStorage.getItem("username") || "Player";

  const createConfetti = () => {
    const container = document.createElement("div");
    container.classList.add("fixed", "inset-0", "pointer-events-none", "z-40");
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add(
        "absolute",
        "w-2",
        "h-2",
        "rounded-full",
        "confetti-fall"
      );

      const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9d56e", "#ff9ff3"];
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(confetti);
    }

    setTimeout(() => {
      document.body.removeChild(container);
    }, 9000);
  };

  useEffect(() => {
    createConfetti();
  }, []);
  const handlePlayAgain = () => {
    // onPlayAgain();
    // navigate("/quiz");
    // navigate(-1);
    setStep(1);
    console.log("clicked");
  };

  return (
    <div className="flex flex-col items-center gap-6 xl:gap-6 bg-purple-600 rounded-2xl p-6 min-h-screen">
      {/* Confetti Animation */}
      <Confetti width={width} height={height} numberOfPieces={200} />
      {/* <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mb-16">
        <div className="text-center">
          <div className="text-2xl font-bold text-teal-900">MONAD </div>
          <div className="text-yellow-400 text-sm">Quiz</div>
        </div>
      </div> */}
      <MonadLogo />

      <div className="  mx-auto max-w-3xl flex">
        <div className=" w-full bg-white border border-gray-400 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center space-y-1">
            <h1>Game Over!</h1>
            <h2 className="font-semibold text-xl">
              Your Score: <span className="text-green-400">{score}</span>
            </h2>
          </div>
        </div>
      </div>
      <button
        // onClick={onPlayAgain} // Use the onPlayAgain prop
        onClick={handlePlayAgain}
        className="mt-8 bg-yellow-500 text-white py-4 px-8 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
      >
        Play Again
      </button>

      <div className="flex items-center justify-center">
        <div className="flex gap-16">
          <div>
            <div
              className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsShareModalOpen(true)}
            >
              <Share
                className="border w-full p-4 rounded-xl border-white shadow-md bg-white"
                style={{
                  width: "60px",
                }}
              />
              <span className="font-bold">Share</span>
            </div>
          </div>
          <Link to="/leaderboard">
            <div className="flex flex-col items-center">
              <Trophy
                className="max-w-28 h-8 border w-full p-4 rounded-xl border-white shadow-md bg-white"
                style={{
                  width: "60px",
                }}
              />
              <span className="font-bold">Leaderboard</span>
            </div>
          </Link>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        score={score}
        playerName={playerName}
        accuracy={85}
        streak={5}
        timeSpent="2:30"
        difficulty="Medium"
      />
    </div>
  );
};

export default GameOver;
