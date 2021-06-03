import React from "react";
import s from "./MainFile.module.scss";
import Numerology from "../pictures/numerology3.jpg";

const SectionTwo = () => {
    return (
        <div className={s.structure}>
            <div className={s.content}>
                <div className={s.leftSide}>
                    <p className={s.header}>Что ваши цифры говорят о вас?</p>
                    <p className={s.contentText}>Приобретя индивидуальную консультацию, вы узнаете:</p>
                    <ul className={s.contentList}>
                        <li>Кто я такой по жизни конкретно?</li>
                        <li>Какое у меня предназначение?</li>
                        <li>Земля реально круглая?</li>
                        <li>Какую профессию мне выбрать?</li>
                        <li>Каких ошибок мне опасаться?</li>    
                    </ul>
                    
                </div>
                <div className={s.rightSide}>
                    <img className={s.illustration} src={Numerology}/>
                </div>
            </div>
        </div>
    );
};

export default SectionTwo;