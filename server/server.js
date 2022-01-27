require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.listen(9000, () => {
  console.log("Server running at port 9000");
});

// Controllers
const { getReviews, getLoggedInReviews, getUserReview, postReview, updateReview, deleteReview } = require("./controllers/reviewController");
const {
  addUser,
  loginUser,
  logout,
  getUserData
} = require("./controllers/userController");

// Middleware
const {
  checkUserExistsSignup,
  checkPwdLen,
  checkCnfPwd,
  checkUserExistsLogin,
  checkPwd,
  authenticateUser,
} = require("./middleware/userMiddleware");

// Routes


// REVIEWS 
app.get("/api/home/loggedinreviews/:m_id", authenticateUser, getLoggedInReviews);

app.get("/api/home/userreview/:m_id", authenticateUser, getUserReview);

app.get("/api/home/:m_id", getReviews);

app.post("/api/home", authenticateUser, postReview);

app.patch("/api/home/updatereview", authenticateUser, updateReview);

app.delete("/api/home/deletereview/:m_id", authenticateUser, deleteReview);


// USER

app.get("/api/home", authenticateUser, getUserData);

app.delete("/api/home", authenticateUser, logout);



app.post("/api/signup", checkUserExistsSignup, checkPwdLen, checkCnfPwd, addUser);

app.post("/api/login", checkUserExistsLogin, checkPwd, loginUser);
