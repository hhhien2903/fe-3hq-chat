import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
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
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
