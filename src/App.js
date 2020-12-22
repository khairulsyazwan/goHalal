// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./navigation/Header";
import Register from "./landings/Register";
import Login from "./landings/Login";
// import Home from "./landings/Home";
// import PrivateRoute from "./private/PrivateRoute";
import Map from "./maps/Map";
import Restaurant from "./pages/Restaurant";
import AllRestaurants from "./pages/AllRestaurants";
import UserProfile from "./private/UserProfile";
import NewHome from "./landings/NewHome";
import RestaurantUser from "./landings/RestaurantUser";
import SignIn from "./landings/Signin";
import SignUp from "./landings/Signup";
import Admin from "./landings/Admin";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter basename="/">
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        isOwner={isOwner}
        setIsOwner={setIsOwner}
        login={login}
        setLogin={setLogin}
        logout={logout}
        setLogout={setLogout}
      />
      <Switch>
        <Route exact path="/">
          <NewHome />
        </Route>

        <Route path="/signin">
          <SignIn
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            login={login}
            setLogin={setLogin}
          />
        </Route>

        <Route path="/signup">
          <SignUp isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>

        <Route path="/all-restaurants">
          <AllRestaurants />
        </Route>

        <Route path="/map">
          <Map />
        </Route>

        <Route path="/user/:id">
          <UserProfile isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>

        <Route path="/restaurant/:id">
          <Restaurant isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>

        <Route path="/admin">
          <Admin
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
