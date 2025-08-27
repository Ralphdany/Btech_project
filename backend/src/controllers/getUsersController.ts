import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface decodedToken {
    userId: string;
    email: string;
}

type Users = { _id: string; name: string; email: string }[];

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as decodedToken;
    console.log(decoded)
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const currentUserId = decoded.userId

    const users = await User.find({_id: {$ne: currentUserId}}).select(["-password", "-__v"]) as Users;
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
