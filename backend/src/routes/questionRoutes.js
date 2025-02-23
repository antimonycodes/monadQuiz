import { Router } from "express";
import {
  getQuestions,
  shuffleQuestions,
} from "../controllers/questionController.js";

const router = Router();

router.get("/questions", getQuestions);
router.get("/questions/shuffle", shuffleQuestions);

export default router;
