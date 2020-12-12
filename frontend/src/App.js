// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './navigation/Header'
import Register from './landings/Register'
import Login from './landings/Login'
import Home from './landings/Home'



function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/login">
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
