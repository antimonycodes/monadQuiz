import { useState, useEffect } from "react";
import { Star, Trophy } from "lucide-react";
// import logo from "../assets/monadLogojpg-removebg-preview.png";
import { axiosInstance } from "../lib/axios";
import MonadLogo from "../components/MonadLogo";
import { Link } from "react-router-dom";

interface HomepageProps {
  onPlayClick: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onPlayClick }) => {
  const [username] = useState(localStorage.getItem("username") || "");
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState<number | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const response = await axiosInstance.get(`/users/score/${username}`);
        setScore(response.data.score);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching user score:", error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await axiosInstance.get("/users/leaderboard");
        const leaderboard = response.data;
        const userRank =
          leaderboard.findIndex((user: any) => user.username === username) + 1;
        setRank(userRank);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    if (username) {
      fetchUserScore();
      fetchLeaderboard();
    }
  }, [username]);

  const getRankSuffix = (rank: number) => {
    if (rank % 10 === 1 && rank % 100 !== 11) {
      return "st";
    } else if (rank % 10 === 2 && rank % 100 !== 12) {
      return "nd";
    } else if (rank % 10 === 3 && rank % 100 !== 13) {
      return "rd";
    } else {
      return "th";
    }
  };

  return (
    <div className="bg-purple-600 h-screen border  border-gray-400 rounded-2xl p-4 flex flex-col items-center gap-6 xl:gap-12">
      {/* user details */}
      <div className=" w-full flex justify-between items-center mb-6">
        {/* name */}
        <div className="flex items-center">
          {/* waving hand */}
          <div className=" text-2xl xl:text-6xl">{"\uD83D\uDC4B"}</div>
          <h1 className=" text-lg xl:text-3xl ml-2">
            Hi, <span>{username}</span>
          </h1>
        </div>
        {/* Avatar */}
        <div className=" size-12 xl:size-20  rounded-full">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full rounded-full"
            />
          )}
        </div>
      </div>
      {/* Points-ranking */}
      <div className=" w-full rounded-3xl bg-white shadow-2xl text-black py-12 px-6 xl:px-12 flex justify-between items-center">
        {/* Point */}
        <div className="flex items-center basis-1/2 border-r-2 border-white">
          <Star
            style={{
              width: "52px",
              height: "52px",
              marginRight: "8px",
              color: "gold",
            }}
          />
          <div className=" text-center text-black">
            <h1 className="text-xl font-bold">{score}</h1>
            <h1 className="text-sm">Total Points</h1>
          </div>
        </div>
        {/* Ranking */}
        <Link to="/leaderboard">
          <div className="flex items-center">
            <Trophy
              style={{
                width: "52px",
                height: "52px",
                marginRight: "8px",
                color: "gold",
              }}
            />
            <div className=" text-center text-black">
              <h1 className="text-xl font-bold">
                {rank !== null && rank !== 0
                  ? `${rank}${getRankSuffix(rank)}`
                  : "-"}
              </h1>
              <h1 className="text-sm">Ranking</h1>
            </div>
          </div>
        </Link>
      </div>
      {/* logo */}
      {/* <div className=" size-60">
        <img src={logo} alt="" />
      </div> */}
      <MonadLogo />
      {/* Play button */}
      <button
        className=" py-4 px-12 rounded-xl w-full bg-yellow-500 text-white font-bold  mt-"
        onClick={onPlayClick}
      >
        PLAY
      </button>
    </div>
  );
};

export default Homepage;
