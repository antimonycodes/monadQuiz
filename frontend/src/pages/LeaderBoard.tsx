import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

interface Leaderboard {
  avatar: string;
  username: string;
  score: string;
}

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosInstance.get("/users/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="h-full bg-black py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-purple-600 rounded-t-3xl pt-4 -mt-8 min-h-screen">
          <div className="flex items-center text-white p-4">
            <button className="flex items-center" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <h1 className="flex-1 text-center text-xl font-medium">
              Leaderboard
            </h1>
          </div>

          {/* Top 3 Layout */}
          <div className="flex justify-center items-end gap-6 my-8">
            {/* Second Place - Left */}
            {leaderboard[1] && (
              <div className="text-center mt-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-400 mb-2 mx-auto overflow-hidden border-2 border-white">
                    <img
                      src={leaderboard[1].avatar}
                      alt="Second place"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <span className="text-2xl">🥈</span> {/* Silver Crown */}
                  </div>
                </div>
                <div className="text-white text-sm">
                  {leaderboard[1].username}
                </div>
                <div className="text-white/80 text-sm">
                  {leaderboard[1].score} points
                </div>
              </div>
            )}

            {/* First Place - Center */}
            {leaderboard[0] && (
              <div className="relative text-center -mt-8">
                <div className="">
                  <div className="w-20 h-20 rounded-full bg-yellow-400 mb-2 mx-auto overflow-hidden border-2 border-white">
                    <img
                      src={leaderboard[0].avatar}
                      alt="First place"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <span className="text-2xl">👑</span> {/* Gold Crown */}
                  </div>
                </div>
                <div className="text-white text-sm">
                  {leaderboard[0].username}
                </div>
                <div className="text-white/80 text-sm">
                  {leaderboard[0].score} points
                </div>
              </div>
            )}

            {/* Third Place - Right */}
            {leaderboard[2] && (
              <div className="text-center mt-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-500 mb-2 mx-auto overflow-hidden border-2 border-white">
                    <img
                      src={leaderboard[2].avatar}
                      alt="Third place"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <span className="text-2xl">🥉</span> {/* Bronze Crown */}
                  </div>
                </div>
                <div className="text-white text-sm">
                  {leaderboard[2].username}
                </div>
                <div className="text-white/80 text-sm">
                  {leaderboard[2].score} points
                </div>
              </div>
            )}
          </div>

          {/* Remaining Users */}
          <div className="space-y-2 p-4">
            {leaderboard.slice(3).map((user, index) => (
              <div
                key={user.username}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-8 text-gray-500">{index + 4}</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">{user.username}</div>
                <div className="text-gray-500">{user.score} points</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
