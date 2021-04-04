import './App.css';
import React, { useState, useEffect } from "react";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import dataHandler from "../dataHandler.js";

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => dataHandler.getUsers().then(result => setUsers(result)), [])
  return (
    <div className="App">
      {console.log(users)}
    </div>
  );

  /*const
      [authStatus, setAuthStatus] = useState(false),
      pageView = authStatus ? <AuthPage /> : <MainPage />

  return (
      pageView
    )*/
}

export default App;
