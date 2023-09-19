import { StatusCodes } from "http-status-codes";
import User from "../models/User";
import { BadRequest } from "../errors";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   Optional - We are using moongose valiation
  //   if (!name || !email || !password) {
  //     throw new BadRequest("Please provide name,email and password");
  //   }
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json(user);
};
const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
