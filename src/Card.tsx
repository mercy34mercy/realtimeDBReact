import React from 'react';


type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
}



type infoprops ={
    infomation:restaurantinfo[]
}


export const Card = (props: infoprops) => {
    console.log("get", props.infomation)
    


    return (
        <div>
            <p>{ props.infomation[1].logo }</p>
        </div>
    )
}