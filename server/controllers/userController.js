const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const { name, email, pwd } = req.body;
  const hashedPwd = await bcrypt.hash(pwd, 10);
  const query = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
    [name, email, hashedPwd]
  );
  res.send("User added");
};

const loginUser = async (req, res) => {
  const { email } = req.body;
  const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = query.rows[0];
  const userData = {
    name: user.name,
    email: user.email,
  };
  const token_secret = process.env.ACCESS_TOKEN_SECRET;
  const access_token = jwt.sign(user.id, token_secret);
  res.cookie("accessToken", access_token, {
    httpOnly: true,
    expires: new Date(Date.now() + 86400000),
  });
  res.send({
    auth: true,
    userData: userData,
  });
};

const getUserData = async (req, res) => {
  const userId = req.userId;
  const query = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
  const userData = query.rows[0];
  delete userData.id;
  delete userData.password;
  res.send({
    auth: true,
    userData: userData,
  });
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.send("Logged out");
};

module.exports = {
  addUser,
  loginUser,
  logout,
  getUserData,
};
