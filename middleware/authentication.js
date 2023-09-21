import { NotAuthenticated } from "../errors.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authentificationMiddleWare = async (req, res, next) => {
  const authHeader = req.header.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new NotAuthenticated("Invalid Auth");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    //
    // attach user to job route
    req.user = { userId: payLoad.userId, name: payLoad.name };
    next(); //Passing this down
  } catch (err) {
    throw new NotAuthenticated("Invalid auth");
  }
};

export default authentificationMiddleWare;
