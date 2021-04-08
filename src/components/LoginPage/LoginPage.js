import React from "react"
import {Switch, Route, NavLink, Redirect} from "react-router-dom"
import AuthForm from "./AuthForm/AuthForm"
import RegisterForm from "./RegisterForm/RegisterForm"
import styles from './loginPage.module.sass'

function LoginPage () {
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
                            <Redirect exact from="/" to="/auth" />
                            <Route exact path="/auth">
                                <AuthForm />
                            </Route>
                            <Route exact path="/register">
                                <RegisterForm />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
    )
}

export default LoginPage
