import React, {useState } from "react";
import s from "./Nav.module.scss";
import { Link, useHistory } from "react-router-dom";

const NavBar = () => {
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

            <div className={s.navigationDiv}>
                <a className={s.adminBadge}>Admin</a>
                <Link to="/adminPanel">Статистика</Link>
            </div>

            <div className={s.btnDiv} onClick={logout}>
                <div className={s.loginDiv} >
                    <a className={s.loginBtn}>ВЫЙТИ</a>
                </div>
            </div>           

        </div>
    );
};

export default NavBar;