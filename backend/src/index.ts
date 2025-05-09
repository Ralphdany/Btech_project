import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import { requireAuth } from "./middlewares/requireAuth";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

interface AuthRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

app.get("/", requireAuth, (req: AuthRequest, res: Response) => {
  const { name, email } = req.user!;
  res.send({ name, email });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
