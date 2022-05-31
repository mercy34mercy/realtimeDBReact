import { useEffect,useRef,useReducer } from 'react';
import { useLocation } from 'react-router';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { RenderResult } from './renderresut';
import React from 'react';
import { LoadRusult } from './Loadresult';
import { Load } from './Load';


export const Result = () => {
    const location = useLocation()
    const [roomid, setroomid] = React.useState<{ data: string }>(location.state as { data: string })
    const {isLoading,firedata } = LoadRusult(roomid.data);
  const firedataRef = useRef(firedata)
  const LoadingRef = useRef(isLoading)
  
    
    if(LoadingRef.current){
        return(
           <Load/>
        )
    }else{
    return(
        <div>
            <RenderResult db={firedataRef.current}/>
        </div>
    )
    }
}