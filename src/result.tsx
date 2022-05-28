import { useEffect,useRef,useReducer } from 'react';
import { useLocation } from 'react-router';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { RenderResult } from './renderresut';
import React from 'react';


export const Result = () => {
    const location = useLocation()
    const [firedata,setfiredata] = React.useState<string[]>([])
    const [roomid, setroomid] = React.useState<{id:string}>(location.state as { id: string })
    const [load,setload] = React.useState(true)
    const [load2,setload2] = React.useState(true)

    const currentFireref  = useRef(firedata)

    useEffect(() => {
        if(load == true){
        const dbRef = ref(getDatabase());
        var varfiredata:string[]
        console.log(roomid.id)
        if (roomid.id === undefined || roomid.id.length < 1) {
          
        } else {
          get(child(dbRef, 'users/' + roomid.id + "/")).then((DataSnapshot) => {
            if (DataSnapshot.exists()) {
              // console.log(DataSnapshot.val());
              DataSnapshot.forEach((element: any) => {
                console.log(element.val().restrauntname)
                if (element.val().restrauntname != undefined) {
                  firedata.push(element.val().restrauntname)
                  console.log("firedata1",firedata)
                  
                }
              })
            setfiredata(firedata)
            setload(false)
            console.log("firedata",firedata)
            currentFireref.current=firedata
            
              console.log("firebaseと通信")
    
            } else {
              console.log("No data available");
            }
          }
          ).catch((error) => {
    
          });
          console.log("refdata",currentFireref.current)
        

        }}else{
            currentFireref.current=firedata
            setfiredata(firedata)
        }
      },[])

    
    if(load == true){
        return(
            <div>
                ロード中
            </div>
        )
    }else{
    return(
        <div>
            <RenderResult db={currentFireref.current}/>
        </div>
    )
    }
}