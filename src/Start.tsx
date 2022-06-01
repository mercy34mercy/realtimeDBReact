import React from 'react';
import "./Start.css"
import { useNavigate } from 'react-router-dom';
import { QrCodeGenerater } from './QrCode'

export const Start = () => {
    const [roomid, setroomid] = React.useState("")
    const navigate = useNavigate();
    const URL:string = "http://localhost:3000/app?id="
    const roomhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setroomid(() => e.target.value)
    }

    const gotoapp = () => {
        if (roomid == "") {
            alert("ルームIDを入力してください")
        } else {
            console.log("aaaa",roomid)
            navigate("/app", { state: { id: roomid } })
        }
    }

    const gotoqrcodereader = () => {
        navigate("/qrcodereader")
    }

    return (
        < div className='start'>
            <p>roomid</p>
            <div>
                <input type="text" value={roomid} onChange={roomhandleChange} />
            </div>
            <button onClick={gotoapp}>スタート</button>
            <div>
                <QrCodeGenerater qrtext={ URL + roomid }/>
            </div>
            <div>
                <button onClick={gotoqrcodereader}>QRを読み取る</button>
            </div>
        </div >
    )
}
