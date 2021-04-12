import React, {useContext} from "react"
import {Switch, Route, NavLink, Redirect} from "react-router-dom"
import AuthForm from "./AuthForm/AuthForm"
import RegisterForm from "./RegisterForm/RegisterForm"
import { UserContext } from "../../dataHandler"
import styles from './loginPage.module.sass'

function LoginPage ( {setActiveUser} ) {
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
                            {/*{
                                useContext(UserContext).id
                                ? <Redirect exact from="/" to="/auth" />
                                : undefined
                            }*/}
                            <Route exact path="/auth">
                                <AuthForm setActiveUser={setActiveUser} />
                            </Route>
                            <Route exact path="/register">
                                <RegisterForm setActiveUser={setActiveUser} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
    )
}

export default LoginPage
