// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./navigation/Header";
import Register from "./landings/Register";
import Login from "./landings/Login";
// import Home from "./landings/Home";
import PrivateRoute from "./private/PrivateRoute";
import Map from "./maps/Map";
import Restaurant from "./pages/Restaurant";
import UserProfile from "./private/UserProfile";
import NewHome from "./landings/NewHome";

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
        <Route path="/register">
          <Register />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
