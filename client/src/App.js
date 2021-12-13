import './App.css';
import AccountProvider from './components/context/AccountContext';
import UserProvider from './components/context/UserContext';
import Messenger from './components/Messenger';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </UserProvider>
    </div>
  );
}

export default App;
