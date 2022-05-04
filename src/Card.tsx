import React from 'react';


type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
}

type info = {
    restaurants: restaurantinfo[]
}

type infoprops ={
    infomation:info
}


export const Card = (props: infoprops) => {
    console.log("get", props.infomation?.restaurants)
    


    return (
        <div>
            <p>{ props.infomation.restaurants[0].logo }</p>
        </div>
    )
}