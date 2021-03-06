import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './MainPage.module.css'

import Logo from './../../assets/images/logo.svg'

export const MainPage = ({ language }) => {
    const setLanguage = (language) => {
        localStorage.setItem('language', JSON.stringify(language))
        document.location.reload()
    }

    const changeHandler = event => {
        setLanguage(event.target.value)
    }

    const languages = [
        { value: JSON.parse(localStorage.getItem('language')) === null ? 'EN' : JSON.parse(localStorage.getItem('language')) },
        { value: 'EN' },
        { value: 'RU' },
        { value: 'TR' },
        { value: 'KG' },
    ]

    return (
        <div className={Styles.mainPage}>
            <div className={Styles.block}>
                <div className={Styles.logo}>
                    <img src={Logo} alt="logo" />
                </div>
                <NavLink to="/menu">{language === 'RU' ? 'меню' : language === 'TR' ? 'menü' : language === 'EN' ? 'menu' : language === 'KG' ? 'меню' : ''}</NavLink>
                <select className={Styles.select} name="language" id="language" onChange={changeHandler}>
                    {
                        languages.map(({ value }, i) => {
                            return (
                                <option key={ i } value={ value }>{ value }</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
