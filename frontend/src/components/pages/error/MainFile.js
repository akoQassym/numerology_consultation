import React from "react";
import s from "./MainFile.module.scss";

const NotFoundPage = () => {
  return (
      <div className={s.structure}>
            <div className={s.Box}>
                <p className={s.header1}>Luckyhits</p>
                <p className={s.MessageTitle}>404 Not Found!</p> 
                <p className={s.Message}>Упс, кажется этой страницы не существует</p>
                <a href="/" className={s.homeBtn}>На главную</a>
            </div>
      </div>
  )
};

export default NotFoundPage;
