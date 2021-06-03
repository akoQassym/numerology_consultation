import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import s from "./MainFile.module.scss";

const SmthWentWrong = () => {
  const history = useHistory();

  function redirect() {
    localStorage.clear();
    history.push("/");
  }


  return (
      <div className={s.structure}>
            <div className={s.Box}>
                <p className={s.header1}>Luckyhits</p>
                <p className={s.MessageTitle}>Что то пошло не так!</p> 
                <p className={s.Message}>Попробуйте еще раз или свяжитесь с цетром поддержки!</p>
                <a onClick={redirect} className={s.homeBtn}>На главную</a>
            </div>
      </div>
  )
};

export default SmthWentWrong;
