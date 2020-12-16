// import logo from './logo.svg';
import React, { useState } from "react";
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

function App() {
  const [valid, setValid] = useState({
    valid: false,
    refreshed: true,
  });

  return (
    <BrowserRouter basename="/">
      <Header />
      <Switch>
        <Route exact path="/">
          <NewHome />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/all-restaurants">
          <AllRestaurants />
        </Route>

        <Route path="/map">
          <Map />
        </Route>

        <Route path="/user/:id">
          <UserProfile />
        </Route>

        <Route path="/restaurant/:id">
          <Restaurant />
        </Route>

        <Route path="/restaurantuser">
          <RestaurantUser />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
