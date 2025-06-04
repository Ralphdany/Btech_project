import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http"; 
import authRoutes from "./routes/authRoutes";
import users from "./routes/users";
import { requireAuth } from "./middlewares/requireAuth";
import dotenv from "dotenv";
import { userPayload } from "./types/socket";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  connectionStateRecovery: {},
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token as string;
  const name= socket.handshake.auth.name as string;
  console.log("Socket connection attempt with token:", token);

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as userPayload;
    socket.user = decoded as userPayload;
    socket.user.name = name; // Add name to user payload
    next();
  } catch (err) {
    next(new Error("Invalid or expired token"));
  }
});

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes, users);

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

io.on("connection", (socket) => {
 
  console.log(`User ${socket.user?.name} connected with ID: ${socket.id} and email: ${socket.user?.email}`);
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


app.get("/", requireAuth, (req: AuthRequest, res: Response) => {
  const { _id, name, email } = req.user!;
  res.send({ _id, name, email });
});

server.listen(port, () => {
  console.log(`Server (with Socket.IO) is running on port ${port}`);
});