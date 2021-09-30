import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;
  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init({
        appId: '50933c43-0c6a-4f66-8b0f-adc494cf109f',
        promptOptions: {
          slidedown: {
            enabled: true,
            actionMessage: "We'd like to show you notifications for the latest news and updates.",
            acceptButtonText: 'Yes',
            cancelButtonText: 'No',
            categories: {
              tags: [
                {
                  tag: 'New Version',
                  label: 'New App Version',
                },
                {
                  tag: 'SDK Updates',
                  label: 'SDK Updates',
                },
              ],
            },
          },
        },
        welcomeNotification: {
          title: 'One Signal',
          message: 'Thanks for subscribing!',
        },
      });
      // OneSignal.setEmail("example@gmail.com");
    });
  }, []);

  const subscriptionHandler = (tag) => {
    OneSignal.push(() => {
      OneSignal.sendTag('categorty', tag);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>3HQ Team from IUH with Love!!!! Front End Team!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
