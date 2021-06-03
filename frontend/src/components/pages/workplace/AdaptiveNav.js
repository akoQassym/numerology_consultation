import React from "react";
import s from "./AdaptiveNav.module.scss";
import { useHistory } from 'react-router-dom';

export default function AdaptiveNav({ closeCallback }) {
    const history = useHistory();

    function logout() {
        localStorage.clear();
        history.push("/login");
    }

    return (
        <div className={s.navAlternative}>
            <div className={s.logoDiv2}>
                <p className={s.header12}>Luckyhits</p>
            </div>

            <div className={s.navDiv2}>
                <ul className={s.navList2}>
                    <li className={s.navElement2}><a href="/profile">Профиль</a></li>
                    <li className={s.navElement2}><a href="/consultations">Купить консультацию</a></li>
                    <li className={s.navElement2}><a href="">Мои партнеры</a></li>
                    <li className={s.navElement2}><a href="">Служба поддержки</a></li>
                    <li className={s.navElement2}><a href="/settings">Настройки</a></li>
                    <li className={s.navElement2}><button onClick={logout} className={s.logoutBtn}><span className={s.btnIcon}></span><a>Выйти</a></button></li>
                </ul>
            </div>

            <div className={s.navCloseBtn} onClick={closeCallback}>
                <div className={s.navCloseBtnLvl1}>
                    <div className={s.navCloseBtnLvl2}></div>
                </div>
            </div>

            
        </div>
    )
}

AdaptiveNav.defaultProps = {
    closeCallback: ()=>{}
}