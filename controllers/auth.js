import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequest } from "../errors";

import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
