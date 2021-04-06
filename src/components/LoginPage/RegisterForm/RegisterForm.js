import React from "react"
import dataHandler from "../../../dataHandler"
import styles from "./registerForm.module.sass"

function RegisterForm () {
    const
        confirmFields = (...fields) => {
            fields.forEach(field => field.classList.add(styles.confirmedField))
        },

        rejectFields = (...fields) => {

        },

        onSubmit = (e) => {
            e.preventDefault()
            const formData = new FormData(e.target),
                data = Object.fromEntries(formData.delete('confirmPassword'))

            dataHandler.registerUser(data)
        },

        onBlurCPassword = (e) => {
            const currentForm = document.forms.registerForm
            e.target.value === currentForm.password.value
                ? confirmFields(currentForm.password, currentForm.confirmPassword)
                : rejectFields(currentForm.password, currentForm.confirmPassword)
        }

    return (
        <form name="registerForm" onSubmit={onSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm your password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" onBlur={onBlurCPassword}/>
            </div>
            <button id="regSubmit">Register</button>
        </form>
    )
}

export default RegisterForm
