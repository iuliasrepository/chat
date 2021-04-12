import './App.css';
import React, {useContext, useEffect, useState} from "react";
import LoginPage from "./LoginPage/LoginPage";
import MainPage from "./MainPage/MainPage";
import { UserContext } from "../dataHandler";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
    let [activeUser, setActiveUser] = useState(null)

    //useEffect(()=>console.log('user changed'), [activeUser])

  return (
        <UserContext.Provider value = {{activeUser, setActiveUser}}>
            <Switch>
                <Redirect exact from="/" to={ activeUser ? "/chat" : "/auth" } />
                <Route path="/chat">
                    <MainPage />
                </Route>
                <Route path="/auth">
                    <LoginPage />
                </Route>
            </Switch>
        </UserContext.Provider>
    )
}

export default App;
