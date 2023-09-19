import User from "../models/User";

const register = async (req, res) => {
  console.log(req.body);
  res.send(req.body);
};
const login = async (req, res) => {
  console.log(req.body);
  res.send("Login");
};

export { login, register };
