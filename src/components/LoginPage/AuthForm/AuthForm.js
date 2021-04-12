import React, {useContext, useState} from "react"
import dataHandler, { UserContext } from "../../../dataHandler"
import { useHistory } from "react-router-dom"
import styles from "../loginForm.module.sass"

function AuthForm ( ) {
    const
        userContext = useContext(UserContext),
        history = useHistory(),
        onSubmit = async e => {
            e.preventDefault()
            const
                data = Object.fromEntries(new FormData(e.target)),
                response = await dataHandler.authUser(data)
            if (response.error)
                console.log(response.error)
            else {
                userContext.setActiveUser(response)
                history.push('/chat')
            }
        }
    return (
        <form name="authForm" onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
            </div>
            <button id="authSubmit">Log in</button>
        </form>
    )
}

export default AuthForm
