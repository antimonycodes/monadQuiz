import Question from "../models/Question.js";

// Get random 15 questions from the database
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Shuffle and get 15 questions from the database
export const shuffleQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    const shuffledQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 15);
    res.status(200).json(shuffledQuestions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
