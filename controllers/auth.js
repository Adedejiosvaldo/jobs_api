import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign({ id: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, token: token } });
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
