import React from 'react';
import "./Start.css"
import { useNavigate } from 'react-router-dom';

export const Start = () => {
    const [roomid, setroomid] = React.useState("")
    const navigate = useNavigate();
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

    return (
        < div className='start'>
            <p>roomid</p>
            <div>
                <input type="text" value={roomid} onChange={roomhandleChange} />
            </div>
            <button onClick={gotoapp}>スタート</button>
        </div >
    )
}
