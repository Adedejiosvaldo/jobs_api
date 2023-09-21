import { NotAuthenticated } from "../errors/index.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authentificationMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new NotAuthenticated("Invalid Auth");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to job route
    req.user = { userId: payLoad.id, name: payLoad.name };
    next(); //Passing this down
  } catch (err) {
    throw new NotAuthenticated("Invalid auth");
  }
};

export default authentificationMiddleWare;
