// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./navigation/Header";
import Register from "./landings/Register";
import Login from "./landings/Login";
import Home from "./landings/Home";
import PrivateRoute from "./private/PrivateRoute";

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
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
