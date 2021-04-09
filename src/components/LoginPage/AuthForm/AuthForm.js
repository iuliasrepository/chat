import React from "react"
import dataHandler from "../../../dataHandler"
import styles from "../loginForm.module.sass"

function AuthForm () {
    const onSubmit = async e => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        dataHandler.authUser(data).then(result => console.log(result))
        //const response = await dataHandler.authUser(data)

        console.log(data)
        //console.log(response)
        //await response.error ? console.log(response.error) : console.log(response)
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
