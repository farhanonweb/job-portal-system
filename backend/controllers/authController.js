import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ===================== REGISTER USER =====================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const image = req.file?.filename || null; 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      image,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// ===================== LOGIN USER =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --------- ADMIN LOGIN ---------
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL, role: "admin" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax", 
       secure:false,
      });

      return res.json({
        success: true,
        message: "Admin login successful",
        user: { email: process.env.ADMIN_EMAIL, role: "admin" },
      });
    }

    // --------- USER LOGIN ---------
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
     
    });

    return res.json({
      success: true,
      message: "User login successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Internal server error" });
  }
};

// ===================== LOGOUT USER =====================
export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ success: true, message: "Logout successful" });
};
