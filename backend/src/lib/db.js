import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await moongoose.connect(process.env.MONGODB_URL);
    console.log(process.env.MONGODB_URL);
    console.log(` MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};
