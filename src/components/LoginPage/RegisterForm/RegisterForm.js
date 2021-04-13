import React, {useContext, useEffect} from "react"
import dataHandler, { UserContext } from "../../../dataHandler"
import { useHistory } from "react-router-dom"
import styles from "../loginForm.module.sass"

function RegisterForm ({ validationFormFields }) {
    const
        //userContext = useContext(UserContext),
        history = useHistory(),
        handleClientErrors = err => {
            if (err.code === "23505") {
                //const errField = err.constraint
                /*errDetails = errField === "users_name_uindex"
                 ? [ [document.forms.registerForm.login], 'Такой логин уже существует']
                 : errField === "users_email_deleted_at_uindex"
                     ? [ [document.forms.registerForm.email], 'Такой email уже зарегистрирован']
                     : console.error('Уникальное поле не обработано')*/
            validationFormFields.rejectFields([document.forms.registerForm.login, document.forms.registerForm.email], 'Такой логин или email уже зарегистрирован')
        } else
            console.log(err)
        },

        onSubmit = async e => {
            e.preventDefault()
            const formData = new FormData(e.target),
                data = Object.fromEntries(formData),
                response = await dataHandler.addUser(data)
            if (response.error)
                handleClientErrors(response.error)
            else {
                history.push('/auth')
            }
        },

/*        onBlurLogin = async e => {
            const
                field = e.target,
                isExist = await dataHandler.isDataExist({name: field.value})
            isExist ? rejectFields([field], 'Такой логин уже существует') : confirmFields([field])
        },

        onBlurEmail = async e => {
            const
                field = e.target,
                isExist = await dataHandler.isDataExist({email: field.value})
            isExist ? rejectFields([field], 'Такой email уже зарегистрирован') : confirmFields([field])
        },*/

        onBlurCPassword = e => {
            const
                currentForm = document.forms.registerForm,
                fields = [currentForm.password, e.target]
            e.target.value === currentForm.password.value
                ? validationFormFields.confirmFields(fields)
                : validationFormFields.rejectFields(fields, 'Пароли не совпадают')
        }

    useEffect(()=> {
        validationFormFields.confirmOnChange(validationFormFields.getFormInputs(document.forms.registerForm))
    }, [] )

    return (
        <form name="registerForm" onSubmit={onSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" name="login"
                       minLength="3"
                       required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"
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
