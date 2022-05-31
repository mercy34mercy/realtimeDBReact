import React from 'react';
import { useLocation } from 'react-router';
import Tinder from './Tinder'
import { NextPage } from './NextPage';
import { Load } from './Load';
import App from './App'
import './Card.css';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAopZTSO6fDpfHhyQ5csKE1MSTwxDLV7eg",
    authDomain: "tabecard.firebaseapp.com",
    databaseURL: "https://tabecard-default-rtdb.firebaseio.com",
    projectId: "tabecard",
    storageBucket: "tabecard.appspot.com",
    messagingSenderId: "697210402988",
    appId: "1:697210402988:web:5d7a2faeaee03e61164709",
    measurementId: "G-XJL2X9RS58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
export const Card = () => {
    document.addEventListener("click", showEvent, false)
    const location = useLocation()
    const [roomid, setroomid] = React.useState<{ id: string }>(location.state as { id: string })
    const { getValue, isLoading, isError } = App("https://hotpeppertabecard.azurewebsites.net");
    if (isLoading) {
        return (
            <Load/>
        )
    }
    return (
        <div>
            <div>
                <Tinder db={getValue} id={roomid.id}></Tinder>
            </div>
            <div>
            <NextPage path="/result" senddata={roomid.id} buttontext='終了'></NextPage>
            </div>
        </div>

    )
}


