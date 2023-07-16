import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./model/model.js";
import config from "../../config.js";

const saltRounds = 10;

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log(token);
    const decodedToken = await Jwt.verify(token, config.jwtSecret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await Jwt.verify(token, config.jwtSecret);
    req.userId = decodedToken.userId;
    const user = await User.findOne({
      where: {
        id: decodedToken.userId,
        isAdmin: true,
      },
    });

    if (user == null || user.length === 0) {
      return res
        .status(400)
        .send("You're not admin, you don't have access here");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = Jwt.sign({ userId: user.id }, config.jwtSecret);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ where: { username, isAdmin: true } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = Jwt.sign(
      { userId: admin.id, isAdmin: true },
      config.jwtSecret
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, password: hashedPass });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createAdmin = async () => {
  const user = "admin";
  const password = "admin";

  const existingUser = await User.findOne({ where: { username: user } });

  if (existingUser) {
    return;
  }

  const hashedPass = await bcrypt.hash(password, saltRounds);

  User.create({ username: user, password: hashedPass, isAdmin: true });
  return;
};

export {
  userLogin,
  adminLogin,
  registerUser,
  authenticateToken,
  isAdmin,
  createAdmin,
};
