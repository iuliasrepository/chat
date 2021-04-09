import React from "react"
import dataHandler from "../../../dataHandler"
import styles from "../loginForm.module.sass"

function RegisterForm () {
    const
        confirmFields = ( fields ) => {
            fields.forEach(field => field.setCustomValidity(''))
        },

        rejectFields = ( fields, msg = '' ) => {
            fields.forEach(field => field.setCustomValidity(msg))
        },

        handleClientErrors = err => {
        if (err.code === "23505") {
            const errField = err.constraint,
                errDetails = errField === "users_name_uindex"
                    ? [ [document.forms.registerForm.login], 'Такой логин уже существует']
                    : errField === "users_email_deleted_at_uindex"
                        ? [ [document.forms.registerForm.email], 'Такой email уже зарегистрирован']
                        : console.error('Уникальное поле не обработано')

                rejectFields(...errDetails)
        } else
            console.log(err)
        },

        onSubmit = async e => {
            e.preventDefault()
            const formData = new FormData(e.target),
                data = Object.fromEntries(formData),
                response = await dataHandler.addUser(data)
            response.error ? handleClientErrors(response.error) : console.log(response)
        },

        onBlurLogin = async e => {
            const
                field = e.target,
                isExist = await dataHandler.isNameExist(field.value)
            isExist ? rejectFields([field], 'Такой логин уже существует') : confirmFields([field])
        },

        onBlurEmail = async e => {
            const
                field = e.target,
                isExist = await dataHandler.isEmailExist(field.value)
            isExist ? rejectFields([field], 'Такой email уже зарегистрирован') : confirmFields([field])
        },

        onBlurCPassword = e => {
            const
                currentForm = document.forms.registerForm,
                fields = [currentForm.password, e.target]
            e.target.value === currentForm.password.value
                ? confirmFields(fields)
                : rejectFields(fields, 'Пароли не совпадают')
        }


    return (
        <form name="registerForm" onSubmit={onSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login"
                       onBlur={onBlurLogin}
                       minLength="3"
                       required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"
                       onBlur={onBlurEmail}
                       required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"
                       minLength="4"
                       required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm your password</label>
                <input type="password" id="confirmPassword"
                       onBlur={onBlurCPassword}
                       minLength="4"
                       required
                />
            </div>
            <button id="regSubmit">Register</button>
        </form>
    )
}

export default RegisterForm
