import React, {useState } from "react";
import s from "./MainFile.module.scss";

const NavBar = () => {
    return (
        <div className={s.structure}>
            <div className={s.logoDiv}>
                <a href="">
                    <p className={s.header1}>Luckyhits</p>
                </a>
            </div>

            <div className={s.navigationDiv}>
                <a href="">О консультациях</a>
                <a href="">Текст</a>
                <a href="">Пакеты</a>
                <a href="">Маркетинг</a>
            </div>

            <div className={s.btnDiv}>
                <div className={s.loginDiv}>
                    <a href="/login" className={s.loginBtn}>ВОЙТИ</a>
                </div>
                <div className={s.registrationDiv}>
                    <a href="/register" className={s.registrationBtn}>РЕГИСТРАЦИЯ</a>
                </div>
            </div>           

        </div>
    );
};

export default NavBar;