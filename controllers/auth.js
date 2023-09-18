const register = async (req, res) => {
  res.send("Registered");
};
const login = async (req, res) => {
  res.send("Login");
};

export { login, register };
