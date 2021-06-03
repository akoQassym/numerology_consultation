import React, { useState } from 'react';
import s from './LoginForm.module.scss';
import Illustration from './pictures/registration.svg';
import Home from './pictures/home.svg';
import { useHistory } from 'react-router';

export default function RegistrationForm() {
    const history = useHistory();

    const parent = null;
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // validation error States
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMsg, setErrorMsg] = useState(false);

    // Handle Input Change
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeSurname(e) {
        setSurname(e.target.value);
    }

    function handleChangeLogin(e) {
        setLogin(e.target.value)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleChangePassword2(e) {
        setPassword2(e.target.value)
    }

    // Submit Button
    function handleSubmit() {
        if (password != password2) {
            setPasswordsMatch(false);
        } else {
            if (localStorage.getItem('parent') != null) {
                parent = localStorage.getItem('parent')
            }
            console.log("here");
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    login: login,
                    name: name,
                    surname: surname,
                    email: email,
                    parent: localStorage.getItem('parent'),
                    password: password,
                    password2: password2
                })
            }
            fetch("/auth/register", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.token) {
                        localStorage.clear();
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('login', data.login);
                        history.push("/profile");
                    } else {
                        setErrorMsg(true);
                    }
                });
        }
    }

    return (
        <div className={s.structureSignup}>
            <a href="/">
                <div className={s.homeDiv}>
                    <img src={Home} className={s.homeBtn}/>
                </div>
            </a>

            <div className={s.authDiv}>
                <div className={s.leftDiv}>
                    <img src={Illustration} className={s.illustration}/>
                </div>

                <div className={s.rightDiv}>
                    <div className={s.logoDiv}>
                        <a href="">
                            <p className={s.header1}>Luckyhits</p>
                        </a>
                        <p className={s.welcome}>Добро пожаловать в Luckyhits</p>
                    </div>
                    <p className={s.title}>Регистрация</p>
                    <p className={errorMsg ? s.errorMsgLogin : s.hide}>Один или несколько полей заполнены неправильно</p>
                    <div className={s.formAuthSignup}>
                        <div className={s.formAuthFlex}>
                            <div className={s.formGroupAuth}>
                                <label htmlFor="firstName">Имя</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={errorMsg ? s.authInput + ' ' + s.error : s.authInput}
                                    id={s.firstName}
                                    onChange={handleChangeName}
                                    required
                                />
                            </div>

                            <div className={s.formGroupAuth}>
                                <label htmlFor="secondName">Фамилия</label>
                                <input
                                    type="text"
                                    name="secondName"
                                    className={errorMsg ? s.authInput + ' ' + s.error : s.authInput}
                                    id={s.secondName}
                                    onChange={handleChangeSurname}
                                    required
                                />
                            </div>

                            <div className={s.formGroupAuth}>
                                <label htmlFor="login">Придумайте логин</label>
                                <input
                                    type="text"
                                    name="login"
                                    className={errorMsg ? s.authInput + ' ' + s.error : s.authInput}
                                    id={s.login}
                                    onChange={handleChangeLogin}
                                    required
                                />
                            </div>
                        </div>

                        <div className={s.formAuthFlex}>
                            <div className={s.formGroupAuth}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={errorMsg ? s.authInput + ' ' + s.error : s.authInput}
                                    id={s.email}
                                    onChange={handleChangeEmail}
                                    required
                                />
                            </div>
                            
                            <div className={s.formGroupAuth}>
                                <label htmlFor="password">Придумайте пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={passwordsMatch ? s.authInput : s.authInput + ' ' + s.error}
                                    id={s.password}
                                    onChange={handleChangePassword}
                                    required
                                />
                            </div>

                            <div className={s.formGroupAuth}>
                                
                                <label htmlFor="passwordConfirm">Подтвердите пароль</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    className={passwordsMatch ? s.authInput : s.authInput + ' ' + s.error}
                                    id={s.passwordConfirm}
                                    onChange={handleChangePassword2}
                                    required
                                />
                                <p className={passwordsMatch ? s.hide : s.errorMsg}>Пароли не совпадают</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className={s.loginBtn}>Зарегистрироваться</button>
                    <p className={s.forgotPass}>У вас уже есть аккаунт? <a href="/login">Войти</a></p>
                </div>
                
            </div>
        </div>
    )
}