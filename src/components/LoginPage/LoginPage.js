import React, {useContext} from "react"
import {Switch, Route, NavLink, Redirect} from "react-router-dom"
import AuthForm from "./AuthForm/AuthForm"
import RegisterForm from "./RegisterForm/RegisterForm"
import { UserContext } from "../../dataHandler"
import styles from './loginPage.module.sass'

function LoginPage () {
    const validationFormFields = {
        confirmFields : fields => {
            fields.forEach(field => field.setCustomValidity(''))
        },

        rejectFields : ( fields, msg = '' ) => {
            fields.forEach(field => field.setCustomValidity(msg))
        },

        confirmOnChange : function (fields) {
            fields.forEach(field =>
                field.oninput = () => this.confirmFields([field])
            )
        },

        getFormInputs : form =>
            Array.from(form.querySelectorAll('input'))
    }
    return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.titleBlock}>
                        <span>Chat</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.navbar}>
                        <div className={styles.link}>
                            <NavLink to="/auth" activeClassName={styles.selected}>Авторизация</NavLink>
                        </div>
                        <div className={styles.link}>
                            <NavLink to="/register" activeClassName={styles.selected}>Регистрация</NavLink>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <Switch>
                            <Route exact path="/auth">
                                <AuthForm validationFormFields = {validationFormFields} />
                            </Route>
                            <Route exact path="/register">
                                <RegisterForm validationFormFields = {validationFormFields} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
    )
}

export default LoginPage
