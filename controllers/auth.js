import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const register = async (req, res) => {
  console.log("token");
  const id = "ddd";
  const token = jwt.sign({ id: id }, "secret");
  console.log(id);
  const user = await User.create({ ...req.body });
  console.log(token);
  res.status(StatusCodes.CREATED).json(token);
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
