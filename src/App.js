import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'simplebar/dist/simplebar.min.css';
import './App.css';
import AppProvider from './contexts/AppProvider';
import AuthProvider from './contexts/AuthProvider';
import Chat from './pages/Chat/Chat';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
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
          </Switch>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
