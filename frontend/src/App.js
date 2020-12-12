// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './landings/Register'
import Login from './landings/Login'


function App() {
  return (
    <BrowserRouter basename="/app">
      <Switch>
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
