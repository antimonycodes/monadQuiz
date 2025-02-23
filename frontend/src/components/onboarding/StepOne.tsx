import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const StepOne = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(1);
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [avatars, setAvatars] = useState<{ filename: string; url: string }[]>(
    []
  );
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    // Fetch avatars from the backend
    const fetchAvatars = async () => {
      try {
        const response = await axiosInstance.get("/avatars");
        setAvatars(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchAvatars();
  }, []);

  const handleStart = async () => {
    try {
      const response = await axiosInstance.post("/users/username", {
        username,
        pin,
        avatar: selectedAvatar,
      });
      toast(response.data.message);
      if (response.status === 201) {
        navigate("/quiz");
      }
      localStorage.setItem("username", response.data.user.username);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast(error.response.data.message);
      } else {
        toast("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#9489FC] p-8 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
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
          {steps === 1 && (
            <div className=" ">
              <div className=" bg-orange-300 text-center text-white  rounded-3xl p-8">
                <h1 className=" text-2xl font-semibold">
                  Welcome to Monad Quiz
                </h1>
                <p>
                  A mini game where you will be tested on your knowledge about
                  the monad ecosystem
                </p>
              </div>
              <button
                onClick={() => setSteps(2)}
                className="w-full mt-8 bg-yellow-400 text-white py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Proceed
              </button>
            </div>
          )}
          {steps === 2 && (
            <div>
              <div className="  text-center text-white font-bold mb-4">
                <h1 className="">*Sign up</h1>
                <p>
                  Already have an account?{" "}
                  <Link to="/signin" className=" text-yellow-300">
                    Sign in
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
              <p className="text-white mb-2 mt-4">Select an Avatar</p>
              <div className="flex flex-wrap gap-4">
                {avatars.map((avatar) => (
                  <img
                    key={avatar.filename}
                    src={avatar.url}
                    alt="Avatar"
                    className={`w-16 h-16 rounded-full cursor-pointer ${
                      selectedAvatar === avatar.filename
                        ? "border-4 border-yellow-400"
                        : ""
                    }`}
                    onClick={() => setSelectedAvatar(avatar.filename)}
                  />
                ))}
              </div>
              <button
                onClick={handleStart}
                className="w-full mt-8 bg-yellow-400 text-white py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepOne;
