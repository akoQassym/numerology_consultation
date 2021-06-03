import React from "react";
import s from "./MainFile.module.scss";

const Footer = () => {
    return (
        <div className={s.structure}>
            <div className={s.logoDiv}>
                <a href="">
                    <p className={s.header1}>Luckyhits</p>
                </a>
                <p className={s.joinus}>Присоединяйся к нам!</p>
            </div>
            <div className={s.secondColumn}>
                <p><a className={s.header2}>Полезные ссылки</a></p>
                <p><a href="#">О консультациях</a></p>
                <p><a href="#">Почему мы?</a></p>
                <p><a href="#">Пакеты</a></p>
                <p><a href="#">Маркетинг</a></p>
            </div>
        </div>
    )
};

export default Footer;