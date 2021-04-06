import React from "react"
import { Switch, Route, Link } from "react-router-dom"
import AuthForm from "./AuthForm/AuthForm"
import RegisterForm from "./RegisterForm/RegisterForm"
import styles from './loginPage.module.sass'

function LoginPage () {
    return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.titleBlock}>
                        Chat
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.navbar}>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/auth">Авторизация</Link>
                                </li>
                                <li>
                                    <Link to="/register">Регистрация</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.formWrapper}>
                        <Switch>
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
