import React, { useState, useEffect } from 'react';
import s from './Consultations.module.scss';
import { Redirect, useHistory } from "react-router-dom";

import Nav from "./Nav";
import AdaptiveNav from "./AdaptiveNav";
import Loading from "../loading/Loading";

export default function Consultations() {
    const [navBar, setNavBar] = useState(false);
    const [loading, setLoading] = useState(true)

    const [empty, setEmpty] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [products, setProducts] = useState(null);
    const [productsBought, setProductsBought] = useState(null);

    const credentials = {
        login: localStorage.getItem("login"),
        token: localStorage.getItem("token")
    }

    useEffect(() => {
        let isMounted = true; 
        backupCheckCredentials();
        getPersonalInfo(isMounted);
        if (products === null) {
            getProductsInfo(isMounted);
        }
        if (productsBought === null) {
            getBoughtProducts(isMounted);
        }
        return () => { isMounted = false }
    }, [empty])



    const showNavBar = () => setNavBar(!navBar);

    async function backupCheckCredentials() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                login: credentials.login,
                token: credentials.token
            })
        }
        await fetch("/auth/backgroundcheck", requestOptions)
            .then((response) => {
                if (response.ok) {
                    response.json()
                } else {
                    localStorage.clear();
                    history.push("/login");
                }
            });
    }


    async function getPersonalInfo(isMounted) {
        const requestOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${credentials.token}`
            }
        }
        await fetch(`/api/user-info/${credentials.login}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    localStorage.clear();
                    history.push("/wrong");
                }
            })
            .then((data) => {
                if (isMounted) {
                    setAvatar(data.avatar);
                }
            });
    }


    async function getProductsInfo(isMounted) {
        await fetch("/api/products")
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setProducts(data);
                }
            });
    }


    async function getBoughtProducts(isMounted) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${credentials.token}`
            }
        }
        await fetch(`/api/buy-check/${credentials.login}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (Object.keys(data).length > 0 && isMounted) {
                    setProductsBought(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
    }


    if ((localStorage.getItem("token") == null) || (localStorage.getItem("login") == null)) {
        return <Redirect to="/login" />
    }

    if (loading) {
        return <Loading />
    }

    if (navBar) {
        return <AdaptiveNav closeCallback={showNavBar}/>
    }

    return (
        <div className={s.structure}>
            <div className={s.navSection}><Nav avatar={avatar}/></div>

            <div className={s.mainSection}>

                <div className={s.sectionTitle}>Консультации</div>

                <div className= {s.navOpenBtn} onClick={() => { showNavBar() }}>
                    <div className={s.one}></div>
                    <div className={s.two}></div>
                    <div className={s.three}></div>
                </div>

                <div className={s.consultationsSection}>
                    <p className={s.subSectionTitle}>Нумерология поможет вам узнать о себе намного больше. Социальное предназначение, там карма анау мнау, в общем брат барлыгы бар конкретно ала бер, смело, озимнин братишкам да тура осы модельди уже 3 жыл киип жур, жап жаксы, окинбейсиз вот конкретно айтам</p>
                    
                    <div className={s.content}>
                        {(() => {
                            return products.map(product => {
                                if (productsBought!=null) {
                                    var boughtProductCheck = productsBought.find((bought) => {return bought.product === product.id});
                                }
                                return (
                                    <div className={s.priceDiv}>
                                        <ul className={s.price}>
                                            <li className={s.priceDivHeader}>{product.productName}</li>
                                            <li className={s.priceTag}>$ {product.price}</li>
                                            <li className={s.present}>10GB Storage</li>
                                            <li className={s.absent}>10 Emails</li>
                                            <li className={s.absent}>10 Domains</li>
                                            <li className={s.absent}>1GB Bandwidth</li>
                                            {(() => {
                                                if (productsBought != null && boughtProductCheck) {
                                                    return <li className={s.bought}>Приобретено</li>
                                                } else {
                                                    return <a href=""><li className={s.buyBtn}>Купить</li></a>
                                                }
                                            })()}
                                        </ul>
                                    </div>
                                )
                            })
                        })()}
                    </div>
                </div>

            </div>
        </div>
    )
}