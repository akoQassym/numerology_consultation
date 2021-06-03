import React from "react";
import s from "./MainFile.module.scss";
import ImageOne from "../pictures/individual.svg";
import ImageTwo from "../pictures/pdf.svg";
import ImageThree from "../pictures/click.svg";

const SectionThree = () => {
    return (
        <div className={s.structure}>
            <p className={s.header}>Узнай больше о себе вместе с нами</p>
            <div className={s.threePrinciple}>
                <div className={s.principle}>
                    <div>
                        <img className={s.illustration} src={ImageOne}/>
                    </div>
                    <div className={s.Title}>Индивидуальный разбор</div>
                    <div className={s.About}>Никаких обобщенностей, все только про вас</div>
                </div>

                <div className={s.principle}>
                    <div>
                        <img className={s.illustration} src={ImageTwo}/>
                    </div>
                    <div className={s.Title}>Никаких потерь</div>
                    <div className={s.About}>Получите нумерологический разбор в виде документа, который будет с вами всегда</div>
                </div>

                <div className={s.principle}>
                    <div>
                        <img className={s.illustration} src={ImageThree}/>
                    </div>
                    <div className={s.Title}>В 1 клик</div>
                    <div className={s.About}>Больше не нужно ждать днями: заполните форму и получите свой разбор в 1 клик</div>
                </div>
            </div>
        </div>
    );
};

export default SectionThree;
