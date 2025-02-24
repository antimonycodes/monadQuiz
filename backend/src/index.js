import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fs from "fs";
import userRoutes from "../src/routes/userRoutes.js";
import questionRoutes from "../src/routes/questionRoutes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve();

// Serve static files
app.use("/avatars", express.static(path.join(rootDir, "public/avatars")));
app.get("/api/avatars", (req, res) => {
  const avatarsDir = path.join(rootDir, "public/avatars");
  fs.readdir(avatarsDir, (err, files) => {
    if (err) {
      console.error("Error reading avatars directory:", err);
      return res.status(500).json({ message: "Server error" });
    }

    // Construct avatar URLs
    const avatars = files.map((file) => ({
      filename: file,
      url: `http://localhost:5001/avatars/${file}`, // Avatar URL
    }));

    res.status(200).json(avatars);
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDir, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
