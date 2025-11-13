import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const createuser = async (req, res) => {
  try {
    const { Firstname, Lastname, Email, Password } = req.body;

    if (!Firstname || !Lastname || !Email || !Password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await user.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newuser = await user.create({
      Firstname,
      Lastname,
      Email,
      Password: hashedPassword,
    });

    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 60000,
    });

    const welcomeMail = `
      <div>
        <h1>Welcome to Vado's Page</h1>
        <p>We’re glad to have you, ${Firstname}! 🎉</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"Vado" <${process.env.EMAIL_USER}>`,
        to: Email,
        subject: "🚀 Welcome!",
        html: welcomeMail,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    res.status(201).json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const checkEmail = await user.findOne({ Email });
    if (!checkEmail) {
      return res.status(400).json({ success: false, message: "Account does not exist. Please sign up." });
    }

    const checkPassword = await bcrypt.compare(Password, checkEmail.Password);
    if (!checkPassword) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: checkEmail._id, role: checkEmail.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 3600000),
    });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user.find().select("-Password");
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findByIdAndDelete(id);
    if (!User) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findByIdAndUpdate(id, req.body, { new: true });
    if (!User) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User updated successfully!", User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export { createuser, getAllUsers, deleteUser, updateUser, login, logout };
