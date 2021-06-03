import React from 'react';
import s from './Nav.module.scss';
import Icon from './pictures/profile2.svg';
import { useHistory } from 'react-router-dom';

export default function Nav({ avatar }) {
    const history = useHistory();

    function logout() {
        localStorage.clear();
        history.push("/login");
    }

    return (
        <div className={s.structure}>
            <div className={s.logoDiv}>
                <a href="">
                    <p className={s.header1}>Luckyhits</p>
                </a>
            </div>

            <div className={s.navDiv}>
                <div className={s.profileDiv}>
                    <div className={s.profileIconBlock}>
                        <img src={avatar ? avatar : Icon} className={s.profileIcon}/>
                    </div>
                </div>
                <ul className={s.navList}>
                    <li className={s.navElement}><a href="/profile">Профиль</a></li>
                    <li className={s.navElement}><a href="/consultations">Купить консультацию</a></li>
                    <li className={s.navElement}><a href="/partners">Мои партнеры</a></li>
                    <li className={s.navElement}><a href="/support">Служба поддержки</a></li>
                    <li className={s.navElement}><a href="/settings">Настройки</a></li>
                </ul>

                <button onClick={logout} className={s.logoutBtn}><span className={s.btnIcon}></span><a>Выйти</a></button>

            </div>
        </div>
    )
}

Nav.defaultProps = {
    avatar: {}
}