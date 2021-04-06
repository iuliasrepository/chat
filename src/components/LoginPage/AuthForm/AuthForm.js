import React from "react"
import dataHandler from "../../../dataHandler"
import styles from "./authForm.module.sass"

function AuthForm () {
    const onSubmit = (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        dataHandler.authUser()
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
