import React from "react";
import s from "./MainFile.module.scss";
import Illustration from "../pictures/documents-removed2.png";

const SectionOne = () => {
    return (
        <div className={s.structure}>
            <div className={s.leftSide}>
                <p className={s.header1}>Luckyhits</p>
                <p className={s.header2}>Индивидуальные консультации по Нумерологии</p>
                <p className={s.header3}>текст текст текст текст тексттекст текст текст текст текст</p>
            </div>
            <div className={s.rightSide}>
                <img className={s.illustration} src={Illustration}/>
            </div>
            <a className={s.pictureCredits} target="_blank" href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
        </div>
    );
};

export default SectionOne;