import React from 'react';

export const Start = () => {
    const [roomid, setroomid] = React.useState("")

    const roomhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setroomid(() => e.target.value)
    }

    return (
                  < div >
            <p>roomid</p>
            <input type="text" value={roomid} onChange={roomhandleChange} />
        </div >
    )
    
}