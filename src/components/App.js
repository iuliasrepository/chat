import './App.css';
import React, {useContext} from "react";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";

function App() {
  //console.log('app')
  const
      UserContext = React.createContext(null),
      activeUser = useContext(UserContext),
      pageView = activeUser ? <MainPage /> : <LoginPage />
      console.log(activeUser)

  return (
      pageView
    )
}

export default App;

/*const [users, setUsers] = useState([])
useEffect(() => dataHandler.getUsers().then(result => setUsers(result)), [])
return (
  <div className="App">
    {console.log(users)}
  </div>
);*/
