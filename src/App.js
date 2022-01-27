import React from "react";
import axios from "axios";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";

function App() {

  const [IsLogin , setIsLogin] = React.useState(false);

  const checkIsLoggedIn = async () => {
    try {
      const res = await axios.get('/api/home', {withCredentials: true})
      const data = res.data;
      const userData = data.userData;
      localStorage.setItem('authUser',JSON.stringify(userData))
      setIsLogin(true)
      
    } catch (err) {
      localStorage.removeItem('authUser')
    }
  }

  React.useEffect(() => {
    checkIsLoggedIn()
  }, [])

  return (
      <div className="main">
        <Router>
          <Navbar IsLogin={IsLogin} setIsLogin={setIsLogin} />
          <Switch>
            <Route path="/" exact>
              <Home IsLogin={IsLogin} />
            </Route>            
            <Route exact path="/login" >
              <Login IsLogin={IsLogin} setIsLogin={setIsLogin} />
            </Route>
            <Route exact path="/signup" >
              <Signup IsLogin={IsLogin} />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
