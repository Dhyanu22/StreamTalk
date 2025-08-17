const User = require("../models/User");
const Session = require("../models/Session");
const { v4: uuidv4 } = require("uuid");

async function handleUserSignUP(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function handleUserSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create session
    const sessionId = uuidv4();
    await Session.create({
      sessionId,
      userId: user._id,
    });

    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "strict",
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      sessionId,
    };

    return res.status(200).json({
      message: "Sign in successful",
      user: userResponse,
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleUserSignUP,
  handleUserSignIn,
};
