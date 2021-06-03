import React, { useState } from "react";
import s from "./MainFile.module.scss";
import NavBar from "./navbar/MainFile";
import One from "./sectionOne/MainFile";
import Two from "./sectionTwo/MainFile";
import Three from "./sectionThree/MainFile";
import Four from "./sectionFour/MainFile";
import Footer from "./footer/MainFile";
import AdaptiveNav from "./adaptiveNav/MainFile";

export default function Landing() {
    const [navBar, setNavBar] = useState(false);
    const showNavBar = () => setNavBar(!navBar);


    if (navBar) {
        return <AdaptiveNav adaptiveNavCallback={showNavBar} />
    }

    return (
        <div className={s.structure}>
            <div className= {s.navOpenBtn} onClick={() => { showNavBar() }}>
                <div className={s.one}></div>
                <div className={s.two}></div>
                <div className={s.three}></div>
            </div>    

            <div className={s.landingStructure}>
                <div className={s.navBar}><NavBar/></div>
                <div className={s.sectionOne}><One/></div>
                <div className={s.sectionTwo}><Two/></div>
                <div className={s.sectionThree}><Three/></div>
                <div className={s.sectionFour}><Four/></div>
                <div className={s.footer}><Footer/></div>
            </div>

            
        </div>
    );
};