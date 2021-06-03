import React, { useEffect , useState } from "react";
import s from "./Settings.module.scss";

import Icon from "./pictures/profile2.svg";
import Visible from "./pictures/visible.svg";
import NonVisible from "./pictures/nonvisible.svg";

import Nav from "./Nav";
import Loading from "../loading/Loading";
import AdaptiveNav from "./AdaptiveNav";
import { useHistory } from "react-router";


export default function Settings() {
    const history = useHistory();

    const [navBar, setNavBar] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const [errorIndicator, setErrorIndicator] = useState(false);
    const [errorIndicatorAvatar, setErrorIndicatorAvatar] = useState(false);
    const [errorIndicatorPassword, setErrorIndicatorPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorMsgAvatar, setErrorMsgAvatar] = useState("");
    const [errorMsgPassword, setErrorMsgPassword] = useState("");

    const [empty, setEmpty] = useState("")
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");

    const [avatar, setAvatar] = useState();

    const credentials = {
        login: localStorage.getItem("login"),
        token: localStorage.getItem("token")
    }

    useEffect(() => {
        let isMounted = true; 
        backupCheckCredentials();
        getPersonalInfo(isMounted);
        return () => { isMounted = false }
    }, [empty])

    const showNavBar = () => setNavBar(!navBar);
    const changeVisibility1 = () => setVisible1(!visible1)
    const changeVisibility2= () => setVisible2(!visible2)
    const changeVisibility3 = () => setVisible3(!visible3)

    async function backupCheckCredentials() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                login: credentials.login,
                token: credentials.token
            })
        }
        fetch("/auth/backgroundcheck", requestOptions)
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
        fetch(`/api/user-info/${credentials.login}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    localStorage.clear();
                    history.push("/wrong");
                }
            })
            .then((data) => {
                if (isMounted) {
                    setUser(data);
                    setName(data.name);
                    setSurname(data.surname);
                    setLogin(data.login);
                    setEmail(data.email);
                    setLoading(false);
                }
            });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeSurname(e) {
        setSurname(e.target.value);
    }

    function handleChangeLogin(e) {
        setLogin(e.target.value)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangeAvatar(e) {
        setAvatar(e.target.files[0])
    }


    const passwordValidation = () => {

    }

    function updatePersonalInfo() {
        const requestOptions = {
            method: "PUT",
            headers: {'Content-Type': 'application/json', 'Authorization': `Token ${credentials.token}`},
            body: JSON.stringify({
                login: credentials.login,
                new_login: login,
                name: name,
                surname: surname,
                email: email
            })
        }
        fetch("/auth/update-profile", requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push("/profile");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setErrorMsg(data.error)
                setErrorIndicator(true);
            })
    }

    function updateAvatar() {
        const uploadData = new FormData();
        uploadData.append('avatar', avatar, avatar.name);
        
        const requestOptions = {
            method: "POST",
            headers: {
                'Authorization': `Token ${credentials.token}`
            },
            body: uploadData
        }
        fetch("/auth/update-avatar", requestOptions)
            .then((response) => {
                if (response.ok) {
                    history.push("/profile");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setErrorMsgAvatar(data.error)
                setErrorIndicatorAvatar(true);
            })
    }

    function updatePassword() {
        
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
            <div className={s.navSection}><Nav avatar={user.avatar}/></div> 

            <div className={s.mainSection}>               
                
                <div className={s.sectionTitle}>Настройки</div>

                <div className= {s.navOpenBtn} onClick={() => { showNavBar() }}>
                    <div className={s.one}></div>
                    <div className={s.two}></div>
                    <div className={s.three}></div>
                </div>

                <div className={s.settingsSection}>
                    <div className={s.settingsSectionLeft}>
                        <div className={s.profileIconBlock}>
                            <img src={user.avatar ? user.avatar : Icon} className={s.profileIcon}/>
                        </div>
                        <p className={s.profileDetails}>{user.name}</p>
                        
                        <div className={s.settingsSubSection}>
                            <p className={errorIndicatorAvatar ? s.errorMsgAvatar : s.hide}>{errorMsgAvatar}</p>
                            <label htmlFor="profilePic" className={s.formLabel}>Изменить профильное изображение:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type="file" 
                                    name="file" 
                                    accept="image/*" 
                                    id={s.profilePic} 
                                    className={s.userInfoInputFile}
                                    onChange={handleChangeAvatar}
                                />
                            </div>

                            <div className={s.formElementDiv}>
                                <button type="submit" onClick={updateAvatar} className={errorIndicatorAvatar ? s.formBtn + ' ' + s.error : s.formBtn}>Изменить профильное изображение</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className={s.settingsSectionRight}>
                        <div>
                            <p className={errorIndicator ? s.errorMsg : s.hide}>{errorMsg}</p>
                            
                            <label htmlFor="firstName" className={s.formLabel}>Имя:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id={s.firstName} 
                                    className={s.userInfoInput}
                                    value={name}
                                    onChange={handleChangeName}
                                /> 
                            </div>

                            <label htmlFor="secondName" className={s.formLabel}>Фамилия:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type="text" 
                                    name="surname" 
                                    id={s.secondName} 
                                    className={s.userInfoInput}
                                    value={surname}
                                    onChange={handleChangeSurname}
                                /> 
                            </div>
                            
                            <label htmlFor="login" className={s.formLabel}>Логин:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type="text" 
                                    name="login" 
                                    id={s.login} 
                                    className={s.userInfoInput}
                                    value={login}
                                    onChange={handleChangeLogin}
                                />
                            </div>

                            <label htmlFor="email" className={s.formLabel}>Email:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id={s.email} 
                                    className={s.userInfoInput}
                                    value={email}
                                    onChange={handleChangeEmail}
                                />
                            </div>

                            <div className={s.formElementDiv}>
                                <button type="submit" onClick={updatePersonalInfo} className={errorIndicator ? s.formBtn + ' ' + s.error : s.formBtn}>Изменить</button>
                            </div>
                            
                            
                        </div>

                        <div className={s.settingsSubSection}>
                            <label htmlFor="oldPassword" className={s.formLabel}>Старый пароль:</label>                            
                            <div className={s.formElementDiv}>
                                <input 
                                    type={visible1 ? "text" : "password"} 
                                    name="oldPassword" 
                                    id={s.oldPassword} 
                                    className={s.userInfoInput} 
                                />
                                <img src={visible1 ? NonVisible : Visible} className={s.actionIcon} onClick={changeVisibility1}/>
                            </div>

                            <label htmlFor="newPassword" className={s.formLabel}>Новый пароль:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type={visible2 ? "text" : "password"} 
                                    name="newPassword" 
                                    id={s.newPassword} 
                                    className={s.userInfoInput} 
                                    onChange={passwordValidation}
                                />
                                <img src={visible2 ? NonVisible : Visible} className={s.actionIcon} onClick={changeVisibility2}/>
                            </div>

                            <label htmlFor="newPasswordConfirm" className={s.formLabel}>Подтвердите новый пароль:</label>
                            <div className={s.formElementDiv}>
                                <input 
                                    type={visible3 ? "text" : "password"} 
                                    name="newPasswordConfirm" 
                                    id={s.newPasswordConfirm} 
                                    className={s.userInfoInput} 
                                />
                                <img src={visible3 ? NonVisible : Visible} className={s.actionIcon} onClick={changeVisibility3}/>
                            </div>

                            <div className={s.formElementDiv}>
                                <button type="submit" onClick={updatePassword} className={errorIndicatorPassword ? s.formBtn + ' ' + s.error : s.formBtn}>Поменять пароль</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            
            </div>


        </div>
    )
}