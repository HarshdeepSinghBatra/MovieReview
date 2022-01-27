const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkUserExistsSignup = async (req, res, next) => {
  const { email } = req.body;
  const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (query.rowCount > 0) {
    res.status(500).send("An account already exists with the email address");
  } else {
    next();
    return;
  }
};

const checkPwdLen = (req, res, next) => {
  const { pwd } = req.body;
  if (pwd.length < 4) {
    res.status(500).send("Password must be at least 4 characters long");
  } else {
    next();
    return;
  }
};

const checkCnfPwd = (req, res, next) => {
  const { pwd, cnf_pwd } = req.body;
  if (pwd !== cnf_pwd) {
    res.status(500).send("Password and password confirmation do not match");
  } else {
    next();
    return;
  }
};

// Login

const checkUserExistsLogin = async (req, res, next) => {
  const { email } = req.body;
  const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (query.rowCount === 1) {
    next();
    return;
  } else {
    res.status(500).send("Couldn't find your account");
  }
};

const checkPwd = async (req, res, next) => {
  const { email, pwd } = req.body;
  const query = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const db_pwd = query.rows[0].password;

  if (await bcrypt.compare(pwd, db_pwd)) {
    next();
    return;
  } else {
    res.status(500).send("Email and password do not match");
  }
};

const authenticateUser = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.accessToken;
  if (!token) return res.status(500).send("Authentication failed");
  else {
      const token_secret = process.env.ACCESS_TOKEN_SECRET;
      jwt.verify(token, token_secret, (err, userId) => {
          if (err) return res.status(500).send("Authentication failed")
          else {
              req.userId = userId;
              next()
          }

      })
  }
  // next();
};

module.exports = {
  checkUserExistsSignup,
  checkPwdLen,
  checkCnfPwd,
  checkUserExistsLogin,
  checkPwd,
  authenticateUser
};
