import React, { useState } from 'react';
import s from './LoginForm.module.scss';
import Illustration from './pictures/login.svg';
import Home from './pictures/home.svg';
import { useHistory } from 'react-router-dom';


export default function LoginForm() {
    const history = useHistory();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [token, setToken] = useState(null);

    function handleChangeLogin(e) {
        setLogin(e.target.value);
    }

    function handleChangePass(e) {
        setPassword(e.target.value);
    }

    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: login,
                password: password
            })
        }
        fetch('/auth/login', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('login', login);
                    setErrorMsg(null);
                    if (data.admin) {
                        console.log(data.admin);
                        history.push("/adminPanel")
                    } else {
                        history.push("/profile");
                    }
                } else {
                    setErrorMsg("Логин или Пароль неправильные");
                }
            });
    }

    if ((localStorage.getItem("token") != null) && (localStorage.getItem("login") != null)) {
        history.push("/profile");
    }

    return ( 
        <div className={s.structure}>
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
                    <div className={s.formAuth}>
                        <p className={s.title}>Вход</p>
                        <p className={errorMsg===null ? s.hide : s.errorMsgLogin}>{errorMsg}</p>
                        <div className={s.formGroupAuth}>
                            <label htmlFor={s.login}>Логин</label>
                            <input
                                type="text"
                                name="login"
                                className={errorMsg==null ? s.authInput : s.authInput + ' ' + s.error}
                                autoFocus
                                required
                                id={s.login}
                                onChange={handleChangeLogin}
                            />
                        </div>

                        <div className={s.formGroupAuth}>
                            <label htmlFor={s.password}>Пароль</label>
                            <input
                                type="password"
                                name="password"
                                className={errorMsg==null ? s.authInput : s.authInput + ' ' + s.error}
                                required
                                id={s.password}
                                onChange={handleChangePass}
                            />
                        </div>                        
                        <button className={s.loginBtn} onClick={handleSubmit}>Войти</button>  
                    </div>
                    <p className={s.forgotPass}>У вас нет аккаунта? <a href="/register">Зарегистрируйтесь</a></p>
                </div>
                
            </div>
        </div>
    )
}