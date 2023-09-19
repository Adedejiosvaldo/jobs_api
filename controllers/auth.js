import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequest } from "../errors";

import bcryptjs from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   Optional - We are using moongose valiation
  //   if (!name || !email || !password) {
  //     throw new BadRequest("Please provide name,email and password");
  //   }

  //Hashing password

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
