import React, { useState } from 'react'
import { useSuccess } from './../../hooks/success.hook'
import Styles from './Item.module.css'

import Plus from './../../assets/images/add_circle_outline_black_24dp.svg'
import Minus from './../../assets/images/remove_circle_outline_black_24dp.svg'
// import Img from './../../assets/images/item.png'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const Item = ({ language, data, i }) => {
    toast.configure({
        position: 'top-right',
        autoClose: 3000,
        draggable: true
    })

    const [count, setCount] = useState(1)
    const [full, setFull] = useState(null)

    const showMore = (i) => {
        setFull(i)
    }

    const successMessage = useSuccess()

    const orderProduct = (name, id) => {
        localStorage.setItem(`order${id}`, JSON.stringify({ data: data, count: count }))
        successMessage(language === 'RU' ? `Заказ - "${name}" добавлен в Ваши заказы` : language === 'TR' ? `Sipariş - ${name} siparişlerinize eklendi` : language === 'EN' ? `Order - ${name} added to your cart` : language === 'KG' ? `Заказ - "${name}" добавлен в Ваши заказы` : '')
    }

    return (
        <div className={Styles.item} data-aos="fade-left" data-aos-delay={i * 50}>
            <img src={ `https://drive.google.com/uc?export=view&id=${data.pictureURL}` } alt={ data.name } />
            <div className={Styles.desc}>
                <button onClick={() => {showMore(data.id)}} className={Styles.category}>
                    <h3 className={Styles.title}>{ data.name }</h3>
                </button>
                <div className={Styles.block}>
                    <p>{ data.price } {language === 'RU' ? 'сом' : language === 'TR' ? 'som' : language === 'EN' ? 'som' : language === 'KG' ? 'сом' : ''}</p>
                    <p className={Styles.count}>
                        <button onClick={() => {count !== 1 ? setCount(count - 1) : setCount(1)}}>
                            <span className={`${Styles.minus} material-icons`}>
                                <img src={ Minus } alt="arrow" />
                            </span>
                        </button>
                        { count }
                        <button onClick={() => {setCount(count + 1)}}>
                            <span className={`${Styles.minus} material-icons`}>
                                <img src={ Plus } alt="arrow" />
                            </span>
                        </button>
                    </p>
                </div>
                <div className={Styles.add}>
                    <button onClick={() => {orderProduct(data.name, data.id)}}>{language === 'RU' ? 'Заказать' : language === 'TR' ? 'Sipariş ver' : language === 'EN' ? 'Order' : language === 'KG' ? 'Заказать' : ''}</button>
                </div>
            </div>
            <div className={`${Styles.full} ${full === data.id ? Styles.active : ''}`}>
                <h4>
                    { data.name }
                    <button onClick={() => {showMore(null)}}>
                        <span className={`material-icons ${Styles.icon}`}>close</span>
                    </button>
                </h4>
                <div className={Styles.text}>
                    <p>{ data.description }</p>
                    <p>{ data.weight }</p>
                </div>
            </div>
        </div>
    )
}
