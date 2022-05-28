import { initializeApp } from 'firebase/app';
import React from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import './App.css';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';
import  Tinder  from './Tinder'

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

const app = initializeApp(firebaseConfig)
// const db = getDatabase(app)



export const App = () => {
  const location = useLocation()
  const [senddata,setsenddata] = React.useState("")
  const [roomid, setroomid] = React.useState<{id:string}>(location.state as { id: string })
  const [inputvalue, setinputvalue] = React.useState("")
  const [firedata, setfiredata] = React.useState<string[]>([])
  const [cardnumber, setcardnumber] = React.useState<number>(1)
  
  const writedata = (urls: string) => {
    const db = getDatabase()
    set(ref(db, 'users/' + roomid.id + "/"+String(Math.floor(Math.random() * 100000))), {
      url: urls
    });
  }


  type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
    id:string
  }
  
  const a: restaurantinfo[] = [{
    name: "a",
    logo: "b",
    photo: "s",
    id:"g"
  }]

  const [getValue, setgetValue] = React.useState<restaurantinfo[]>(a) 
  const navigate = useNavigate();


  useEffect(() => { 
    const access = async () => {
      setgetValue([])
      const response = await fetch("https://hotpeppertabecard.azurewebsites.net");
      const body = await response.json();
      const responsejson:restaurantinfo[] = body["data"]
      responsejson.forEach((elements,index) => {
        const data: restaurantinfo = {
          logo: elements.logo,
          name: elements.name,
          photo: elements.photo,
          id:elements.id
        }
        getValue.push(data)
      })
      setgetValue(getValue)
    }
    access();
  }, []);
 

  const senddatahandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsenddata(() => e.target.value)
  }

  const gotoresult = () => {
    navigate("/result", { state: { id: roomid.id } })
  }



  if (getValue.length <= 5) {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
        </body>
      </div>
    )
  } else {

    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <div>
            <Card information={Array.from(new Set(getValue))} parecardnumber={cardnumber} parehandlechange={setcardnumber} roomid={roomid.id}></Card>
            <button onClick={gotoresult}>終了</button>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
