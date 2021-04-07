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

        onSubmit = e => {
            e.preventDefault()
            const formData = new FormData(e.target),
                data = Object.fromEntries(formData.delete('confirmPassword'))

            //dataHandler.registerUser(data)
        },

        onBlurLogin = async e => {
            const
                field = e.target,
                login = field.value.length > 3
                    ? await dataHandler.isNameExist(field.value)
                    : rejectFields([field], 'Длина логина не менее 4 символов')
                console.log(login)
            //login.length ? rejectFields([field], 'Такой логин уже существует') : confirmFields([field])
        },

        onBlurEmail = async e => {
            const
                field = e.target,
                email = await dataHandler.isEmailExist(field.value)
            console.log(email)

            //email.length ? rejectFields([field], 'Такой email уже зарегистрирован') : confirmFields([field])
        },

        onBlurCPassword = e => {
            const
                currentForm = document.forms.registerForm,
                fields = [currentForm.password, currentForm.confirmPassword]
            e.target.value === currentForm.password.value
                ? confirmFields(fields)
                : rejectFields(fields, 'Пароли не совпадают')
        },

        onFocusField = e =>
            e.target.classList.remove(styles.confirmedField, styles.rejectedField)


    return (
        <form name="registerForm" onSubmit={onSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login"
                       //onBlur={onBlurLogin}
                       //onFocus={onFocusField}
                       minLength="4"
                       required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"
                       //onBlur={onBlurEmail}
                       //onFocus={onFocusField}
                       required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"
                       //onFocus={onFocusField}
                       minLength="4"
                       required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm your password</label>
                <input type="password" id="confirmPassword" name="confirmPassword"
                       onBlur={onBlurCPassword}
                       //onFocus={onFocusField}
                       minLength="4"
                       required
                />
            </div>
            <button id="regSubmit">Register</button>
        </form>
    )
}

export default RegisterForm
