import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import './App.css';
import AuthProvider from './contexts/AuthProvider';
import AppProvider from './contexts/AppProvider';
import 'simplebar/dist/simplebar.min.css';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
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
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
          </Switch>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
