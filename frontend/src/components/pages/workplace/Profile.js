import React, { useEffect, useState } from 'react';
import s from './Profile.module.scss';
import { Redirect, useHistory } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon from './pictures/profile2.svg';
import Copy from './pictures/copy.svg';
import PerfectMoneyIcon from './pictures/perfectMoney.jpg';

import Nav from "./Nav";
import Loading from "../loading/Loading";
import AdaptiveNav from './AdaptiveNav';

export default function Profile(props) {
    const history = useHistory();

    const [navBar, setNavBar] = useState(false);

    // Copy to Clipboard values
    const [referralLink, setReferralLink] = useState("");

    // Packages Bought
    const [productsBought, setProductsBought] = useState(null)

    const [user, setUser] = useState({});
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

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
    }, [referralLink])

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
                    setUser(data);
                    setReferralLink(`127.0.0.1:8000/p=${credentials.login}`);
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


    function notify() {
        toast.success('???? ??????????????????????!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 

    const showNavBar = () => setNavBar(!navBar);


    if ((localStorage.getItem("token") == null) || (localStorage.getItem("login") == null)) {
        return <Redirect to="/login" />
    }

    

    if (navBar) {
        return <AdaptiveNav closeCallback={showNavBar}/>
    }

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className={s.structure}>
                <div className={s.navSection}><Nav avatar={user.avatar}/></div>           

                <div className={s.mainSection}>               
                    
                    <div className={s.sectionTitle}>?????????? ????????????????????, {user.name}</div>

                    <div className= {s.navOpenBtn} onClick={() => { showNavBar() }}>
                        <div className={s.one}></div>
                        <div className={s.two}></div>
                        <div className={s.three}></div>
                    </div>           

                    <div className={s.profileSection}>
                        <div className={s.profileInfo}>
                            <div className={s.profileIconBlock}>
                                <img src={user.avatar ? user.avatar : Icon} className={s.profileIcon}/>
                            </div>
                            
                            <div className={s.profileInfoBlock}>
                                <p className={s.profileInfoRow}><b>??????????:</b> {credentials.login}</p>
                                <p className={s.profileInfoRow}><b>??????:</b> {user.name}</p>
                                <p className={s.profileInfoRow}><b>??????????????:</b> {user.surname}</p>
                                <p className={s.profileInfoRow}><b>Email:</b> {user.email}</p>
                                <a href="/settings"><button className={s.profileBtn}>???????????????? ????????????????????</button></a>
                            </div>
                        </div>
                        <div className={s.profileStats}>
                            <p className={s.profileStatsRow}>???????? ?????????????????????? ????????????:</p>
                            <div className={s.profileStatsInputFlexBox}>
                                <input 
                                    className={s.referralLink} 
                                    type="text" 
                                    value={referralLink} 
                                    readOnly
                                />
                                <CopyToClipboard text={referralLink} onCopy={notify}>
                                    <img className={s.copyIcon} src={Copy} />
                                </CopyToClipboard>
                                <ToastContainer/>
                            </div>

                            <p className={s.profileStatsRow}>?????????? ???????????? ???????????????? <a href="https://perfectmoney.com/signup.html" target="_blank" rel="noreferrer" >Perfect Money:</a></p>
                            <div className={s.profileStatsInputFlexBox}>
                                <input 
                                    className={s.referralLink} 
                                    type="text" 
                                    value={user.perfect_money_account} 
                                    readOnly
                                />
                                <CopyToClipboard text={user.perfect_money_account} onCopy={notify}>
                                    <img className={s.copyIcon} src={Copy} />
                                </CopyToClipboard>
                                <a href="https://perfectmoney.com/signup.html" target="_blank"><img className={s.copyIcon} src={PerfectMoneyIcon} /></a>
                            </div>
                            
                        </div>
                    </div>

                    <div className={s.consultationsSection}>
                        <p className={s.subSectionTitle}>?????????????????? ???????????????????????? (<a href="/consultations">??????????????????</a>)</p>
                        <div className={s.container}>
                            <ul className={s.responsiveTable}>
                                <li className={s.tableHeader}>
                                    <div className={s.hcol1}>????????????????</div>
                                    <div className={s.hcol2}>????????????????</div>
                                    <div className={s.hcol3}>????????</div>
                                    <div className={s.hcol4}>????????????</div>
                                </li>
                                {(()=>{
                                    return products.map(product => {
                                        if (productsBought!=null) {
                                            var boughtProductCheck = productsBought.find((bought) => {return bought.product === product.id});
                                        }
                                        return (
                                            <li className={productsBought!=null && boughtProductCheck ? s.tableRow + ' ' + s.bought : s.tableRow} key={product.id}>
                                                <div className={s.col1} data-label="????????????????">{product.productName}</div>
                                                <div className={s.col2} data-label="????????????????">{product.productDescription}</div>
                                                <div className={s.col3} data-label="????????">${product.price}</div> 
                                                {(()=>{
                                                    if (productsBought != null && boughtProductCheck) {
                                                        return <div className={s.col4 + ' ' + s.notAvailable} data-label="????????????">??????????????</div>
                                                    } else {
                                                        return <div className={s.col4 + ' ' + s.available} data-label="????????????">????????????????</div>
                                                    }
                                                })()}   
                                            </li>
                                        )
                                    })
                                })()}         
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            
            
        );
    }
}