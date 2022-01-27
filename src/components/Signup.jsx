import axios from "axios";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import UserAuthError from "./UserAuthError";

const Signup = ({ IsLogin }) => {

  const [IsSignup, setIsSignup] = React.useState(false)
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


  const [Name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [CnfPassword, setCnfPassword] = React.useState("");
  // const [IsAuthError, setIsAuthError] = React.useState(null)
  const [ErrorMsg, setErrorMsg] = React.useState(null);

  const addUser = async (name, email, pwd, cnf_pwd) => {
    try {
      setErrorMsg(null);
      const res = await axios.post("/api/signup", {
        name: name,
        email: email,
        pwd: pwd,
        cnf_pwd: cnf_pwd,
      });
      // const data = res.data;
      // console.log(data)
      setIsSignup(true)
    } catch (err) {
      // console.log(err.response.data);
      setErrorMsg(err.response.data);
      // console.log(typeof IsAuthError)
    }
  };

  React.useEffect(() => {
    setPassword("");
    setCnfPassword("");
  }, [ErrorMsg]);

  const submitSignup = (e) => {
    e.preventDefault();
    addUser(Name, Email, Password, CnfPassword);
  };

  return (
    <div className="login-wrapper" style={{background: `url(${RandomBackdrop})`}}>
      <div className="login">
        {IsLogin && <Redirect to="/" /> }
        {IsSignup && <Redirect to="/login" />}
        <h1>Signup</h1>
        <form action="" onSubmit={submitSignup}>
          <fieldset>
            <input
              type="text"
              value={Name}
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </fieldset>
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
              placeholder="Password ( Minimum 4 characters )"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              value={CnfPassword}
              placeholder="Confirm password"
              onChange={(e) => setCnfPassword(e.target.value)}
              required
            />
          </fieldset>
          <fieldset>
            <p>
              By clicking the "Sign up" button below, I certify that I have read
              and agree to the Movie_Review terms of use and privacy policy.
            </p>
          </fieldset>
          {ErrorMsg && (
            <fieldset>
              <UserAuthError err={ErrorMsg} />
            </fieldset>
          )}
          <fieldset className="signin-btn-fieldset">
            <button type="submit" className="signin-btn">
              Sign Up
            </button>
          </fieldset>
          <fieldset className="login-signup-fieldset">
            Already a member?{" "}
            <Link to="/login" className="login-signup-link">
              Login
            </Link>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
