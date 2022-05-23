import React from 'react';
import "./Start.css"

export const Start = () => {
    const [roomid, setroomid] = React.useState("")

    const roomhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setroomid(() => e.target.value)
    }

    return (
        < div className='start'>
            <p>roomid</p>
            <div>
                <input type="text" value={roomid} onChange={roomhandleChange} />
            </div>
            <button>スタート</button>
        </div >
    )
    
}