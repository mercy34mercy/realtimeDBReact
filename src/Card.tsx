import React from 'react';
// import "./Card.css"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-cards";
// // import required modules
// import { EffectCards } from "swiper";

type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
}

type infoprops = {
    infomation: restaurantinfo[]
    parehandlechange: any
    parecardnumber: number
}

const samplefunc = (event: Event) => {
    console.log(event)
}
function showEvent(event: Event) {
    event.preventDefault();
    let text_node = document.createTextNode(event.type + '\n');
    console.log(text_node);
    let start: number = 0
    if (event.type === 'touchstart') {
        samplefunc(event)
    } else if (event.type === 'click') {
        samplefunc(event)
    }
}
export const Card = (props: infoprops) => {
    document.addEventListener("click", showEvent, false)
    // document.addEventListener("touchstart", showEvent, false)


    const cardview = (cardnum: number) => {
        const cardClass = "swipeCard"

        return (
            <div className={cardClass}>
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
    cardnum: number
}


export const CountupButton = (props: CountupButtonprops) => {
    const clickbutton = () => {
        props.handlechange(props.cardnum + 1)
    }
    const clickbuttonback = () => {
        props.handlechange(props.cardnum - 1)
    }
    return (
        <div className="CountupButton">
            <button onClick={clickbuttonback}>戻る</button>
            <button onClick={clickbutton}>次</button>
        </div>
    )
}