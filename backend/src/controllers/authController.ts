import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as SignupRequest;

    // Input validation
    if (!name || !email || !password) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Name, email, and password are required",
      });
      return;
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        error: "User exists",
        message: "A user with this email already exists",
      });
      return;
    }

    // Create and save user
    const user = new User({ name, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || "");

    res.status(201).json({
      message: "User successfully signed up!",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      error: "Server error",
      message: "An error occurred during signup",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as SigninRequest;

    // Input validation
    if (!email || !password) {
      res.status(400).json({
        error: "Missing credentials",
        message: "Email and password are required",
      });
      return;
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
      return;
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
      return;
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || "");

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: "An error occurred during signin",
    });
  }
};
