// import User from "../models/User.js";

// // Save a new user with a unique username and PIN
// export const saveUser = async (req, res) => {
//   const { username, pin, avatar } = req.body;

//   try {
//     const newUser = new User({
//       username,
//       pin,
//       avatar: `http://localhost:5001/avatars/${avatar}`,
//     });
//     await newUser.save();
//     res
//       .status(201)
//       .json({ message: "User created successfully", user: newUser });
//   } catch (error) {
//     console.log(error);
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ message: "Username already exists, choose another one" });
//     }
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Sign in user
// export const signInUser = async (req, res) => {
//   const { username, pin } = req.body;

//   try {
//     const user = await User.findOne({ username, pin });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid username or PIN" });
//     }
//     res.status(200).json({ message: "Sign-in successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get the leaderboard
// export const getLeaderboard = async (req, res) => {
//   try {
//     const users = await User.find().sort({ score: -1 }).limit(10);
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Update user score
// export const updateUserScore = async (req, res) => {
//   const { username, score } = req.body;

//   try {
//     const user = await User.findOneAndUpdate(
//       { username },
//       { score },
//       { new: true, upsert: true }
//     );
//     res.status(200).json({ message: "Score updated successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get user score and avatar
// export const getUserScore = async (req, res) => {
//   const { username } = req.params;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ score: user.score, avatar: user.avatar });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import validator from "validator";
// import rateLimit from "express-rate-limit";

// Rate limiting for auth endpoints
// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // 5 attempts
//   message: { message: "Too many attempts, please try again later" },
// });

// Validate username and PIN
const validateUserInput = (username, pin) => {
  const errors = {};

  if (!username || !validator.isLength(username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }
  if (!validator.isAlphanumeric(username)) {
    errors.username = "Username can only contain letters and numbers";
  }
  if (!pin || !validator.isLength(pin, { min: 4, max: 4 })) {
    errors.pin = "PIN must be exactly 4 digits";
  }
  if (!validator.isNumeric(pin)) {
    errors.pin = "PIN must contain only numbers";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Save a new user with a unique username and hashed PIN
export const saveUser = async (req, res) => {
  try {
    const { username, pin, avatar } = req.body;

    // Validate input
    const validation = validateUserInput(username, pin);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Validate avatar
    if (!avatar) {
      return res.status(400).json({ message: " select an avatar" });
    }

    // Hash PIN
    const hashedPin = await hash(pin, 10);

    // Create user with sanitized data
    const newUser = new User({
      username: validator.escape(username.toLowerCase()),
      pin: hashedPin,
      avatar: `http://localhost:5001/avatars/${avatar}`, // Keeping original avatar URL structure
      score: 0, // Initialize score
    });

    await newUser.save();

    // Don't send back the PIN in response
    const userResponse = { ...newUser.toObject() };
    delete userResponse.pin;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username already exists, please choose another one",
      });
    }
    console.error("User creation error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Sign in user
export const signInUser = async (req, res) => {
  try {
    const { username, pin } = req.body;

    // Validate input
    const validation = validateUserInput(username, pin);
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Find user and verify PIN
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or PIN" });
    }

    const isPinValid = await compare(pin, user.pin);
    if (!isPinValid) {
      return res.status(401).json({ message: "Invalid username or PIN" });
    }

    // Don't send back the PIN in response
    const userResponse = { ...user.toObject() };
    delete userResponse.pin;

    res.status(200).json({
      message: "Sign-in successful",
      user: userResponse,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("-pin") // Exclude PIN from results
      .sort({ score: -1 })
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Update user score
export const updateUserScore = async (req, res) => {
  try {
    const { username, score } = req.body;

    // Validate input
    if (!username || !validator.isAlphanumeric(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (typeof score !== "number" || score < 0) {
      return res.status(400).json({ message: "Invalid score" });
    }

    // Find user first to get current score
    const currentUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add new score to existing score
    const updatedScore = currentUser.score + score;

    // Update user with accumulated score
    const user = await User.findOneAndUpdate(
      { username: username.toLowerCase() },
      { score: updatedScore },
      {
        new: true,
        select: "-pin", // Exclude PIN from response
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Score updated successfully",
      user,
      scoreAdded: score,
      totalScore: updatedScore,
    });
  } catch (error) {
    console.error("Score update error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Get user score and avatar
export const getUserScore = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate input
    if (!username || !validator.isAlphanumeric(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("score avatar username");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user score error:", error);
    res.status(500).json({ message: "Server error occurred" });
  }
};
