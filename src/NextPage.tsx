import React from 'react';
import { useNavigate } from 'react-router-dom';

type props = {
    path: string,
    senddata: string,
    buttontext:string
}

export const NextPage = (props:props) => {
    const navigate = useNavigate();
    const donavigate= () =>{
        navigate(props.path, { state: { data: props.senddata } })
    } 
    return (
        <div>
            <button onClick={donavigate}>{ props.buttontext }</button>
        </div>
    )
}