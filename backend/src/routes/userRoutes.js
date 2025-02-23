import { Router } from "express";
import {
  getLeaderboard,
  getUserScore,
  saveUser,
  signInUser,
  updateUserScore,
} from "../controllers/userController.js";

const router = Router();

router.post("/username", saveUser);
router.post("/signin", signInUser);
router.get("/leaderboard", getLeaderboard);
router.post("/update-score", updateUserScore);
router.get("/score/:username", getUserScore);

export default router;
