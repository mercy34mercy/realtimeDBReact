import React from 'react';

type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
}

type infoprops ={
    infomation: restaurantinfo[]
    parehandlechange: any
    parecardnumber:number
}


export const Card = (props: infoprops) => {
   

    const cardview = (cardnum:number) => {
        return (
            <div>
                <p>
                    {props.infomation[cardnum].name}
                </p>
                <p>
                    <img src={props.infomation[cardnum].photo} alt="" />
                </p>
            </div>
        )
    }

    return (
        <div>
            {cardview(props.parecardnumber)}
            <CountupButton handlechange={props.parehandlechange} cardnum={props.parecardnumber}></CountupButton>
        </div>
    )
}

type CountupButtonprops = {
    handlechange: any
    cardnum:number
}


export const CountupButton = (props:CountupButtonprops) => {
    const clickbutton = () => {
        props.handlechange(props.cardnum + 1)
    }
    const clickbuttonback = () => {
        props.handlechange(props.cardnum -1)
    }
    return (
        <div>
            <button onClick={clickbuttonback}>戻る</button>
            <button onClick={clickbutton}>次</button>
        </div>
    )
}