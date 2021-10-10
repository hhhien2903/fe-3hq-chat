import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import Register from '../Register/Register';
import './App.css';
import AuthProvider from '../../contexts/AuthProvider';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
