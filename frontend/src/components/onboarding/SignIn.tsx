import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  //   const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axiosInstance.post("users/signin", {
        username,
        pin,
      });
      localStorage.setItem("username", response.data.user.username);
      navigate("/quiz");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          // Validation errors (e.g., invalid username or PIN format)
          Object.values(error.response.data.errors).forEach((errMsg: any) =>
            toast(errMsg)
          );
        } else {
          // General error message
          toast(error.response.data.message);
        }
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#9489FC] p-8 flex flex-col">
      <div className="flex-1 flex flex-col items-center">
        <div className="wrapper w-full">
          <svg>
            <text x="50%" y="50%" dy=".35em" text-anchor="middle">
              Dave X Antimony
            </text>
          </svg>
        </div>
        <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mb-16">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-900">MONAD </div>
            <div className="text-yellow-400 text-sm">Quiz</div>
          </div>
        </div>
        <div className="w-full max-w-sm">
          <div className="text-center text-white font-bold mb-4">
            <h1 className="">*Sign in</h1>
            <p>
              Don't have an account?{" "}
              <Link to="/" className="text-yellow-300">
                Sign up
              </Link>
            </p>
          </div>
          <p className="text-white mb-2">Enter username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30"
            placeholder="John Doh..."
          />
          <p className="text-white mb-2 mt-4">Enter a 4-digit PIN</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30"
            placeholder="****"
          />
          <button
            onClick={handleSignIn}
            className="w-full mt-8 bg-yellow-400 text-white py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
