import React from "react";
import s from "./MainFile.module.scss";

export default function AdaptiveNav({ adaptiveNavCallback }) {
    
    return (
        <div className={s.navAlternative}>
            <div className={s.logoDiv2}>
                <p className={s.header12}>Luckyhits</p>
            </div>

            <div className={s.navDiv2}>
                <ul className={s.navList2}>
                    <li className={s.navElement2}><a href="/login">ВХОД</a></li>
                    <li className={s.navElement2}><a href="/register">РЕГИСТРАЦИЯ</a></li>
                </ul>
            </div>

            <div className={s.navCloseBtn} onClick={adaptiveNavCallback}>
                <div className={s.navCloseBtnLvl1}>
                    <div className={s.navCloseBtnLvl2}></div>
                </div>
            </div>
        </div>
    )
}

AdaptiveNav.defaultProps = {
    adaptiveNavCallback: () => {}
}