import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import UserAuthError from "./UserAuthError";

const Login = ({ IsLogin, setIsLogin }) => {

  const [RandomBackdrop, setRandomBackdrop] = React.useState('');

  const getRandomBackdrop = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc`
    );
    const MoviesList = res.data.results;
    const random = Math.floor(Math.random() * 20);
    setRandomBackdrop(`https://image.tmdb.org/t/p/w1280${MoviesList[random].backdrop_path}`)
  }


  React.useEffect(() => {
    getRandomBackdrop()
  }, [])


  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [ErrorMsg, setErrorMsg] = React.useState(null);

  const loginUser = async (email, pwd) => {
    try {
      setErrorMsg(null);
      const res = await axios.post(
        "/api/login",
        {
          email: email,
          pwd: pwd,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      const userData = data.userData;
      // console.log(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));
      setIsLogin(true);
    } catch (err) {
      setErrorMsg(err.response.data);
    }
  };

  React.useEffect(() => {
    setPassword("");
  }, [ErrorMsg]);

  const submitLogin = (e) => {
    e.preventDefault();
    loginUser(Email, Password);
  };

  return (
    <div className="login-wrapper" style={{background: `url(${RandomBackdrop})`}}>
      <div className="login">
        {IsLogin && <Redirect to="/" />}
        <h1>Login</h1>
        <form action="" onSubmit={submitLogin}>
          <fieldset>
            <input
              type="email"
              value={Email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              value={Password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          {ErrorMsg && (
            <fieldset>
              <UserAuthError err={ErrorMsg} />
            </fieldset>
          )}
          <fieldset className="signin-btn-fieldset">
            <button type="submit" className="signin-btn">
              Login
            </button>
          </fieldset>
          <fieldset className="login-signup-fieldset">
            New to Movie_Review?{" "}
            <Link to="/signup" className="login-signup-link">
              Sign up
            </Link>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
