import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { Types } from "mongoose";

interface AuthRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "No authorization header" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "") as {
      userId: string;
    };
    const user = (await User.findById(decoded.userId)) as IUser & {
      _id: Types.ObjectId;
    };

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
