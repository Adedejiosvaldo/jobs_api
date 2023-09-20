import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { BadRequest, NotAuthenticated } from "../errors/index.js";
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name, token } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthenticated("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

export { login, register };
