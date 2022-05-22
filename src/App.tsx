import { initializeApp } from 'firebase/app';
import React from 'react';
import { useEffect } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import './App.css';
import { Card } from './Card';
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



const App = () => {
  const [senddata,setsenddata] = React.useState("")
  const [roomid,setroomid] = React.useState("")
  const [inputvalue, setinputvalue] = React.useState("")
  const [firedata, setfiredata] = React.useState<string[]>([])
  const [cardnumber, setcardnumber] = React.useState<number>(1)
  
  const writedata = (urls: string) => {
    const db = getDatabase()
    set(ref(db, 'users/' + roomid + "/"+String(Math.floor(Math.random() * 100000))), {
      url: urls
    });
  }


  type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
  }
  
  const a: restaurantinfo[] = [{
    name: "a",
    logo: "b",
    photo:"s"
  }]

  const [getValue, setgetValue] = React.useState<restaurantinfo[]>(a) 


  useEffect(() => {
    const dbRef = ref(getDatabase());
    if (roomid === undefined || roomid.length < 1) {
      
    } else {
      get(child(dbRef, 'users/' + roomid + "/")).then((DataSnapshot) => {
        if (DataSnapshot.exists()) {
          // console.log(DataSnapshot.val());
          DataSnapshot.forEach((element: any) => {
            console.log(element.val().id)
            if (element.val().url != undefined) {
              firedata.push(String(element.val().url))
            }
          })
          // setfiredata(firedata)
          console.log("firebaseと通信")

        } else {
          console.log("No data available");
        }
      }
      ).catch((error) => {

      });
      console.log(firedata)
    }
  }, [cardnumber])



  useEffect(() => { 
    const access = async () => {
      setgetValue([])
      const response = await fetch("https://tabecardhotpepper.azurewebsites.net/");
      const body = await response.json();
      const responsejson:restaurantinfo[] = body["data"]
      responsejson.forEach((elements,index) => {
        const data: restaurantinfo = {
          logo: elements.logo,
          name: elements.name,
          photo: elements.photo
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

  const renderfire = firedata.map((fire,index) => {
    return (
      <div className="resultCard">
        <p>
          {Array.from(new Set(firedata))[index]}
        </p>
      </div>
    )
  })

  if (getValue.length <= 5) {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={() => writedata(senddata)}>送信</button>
        </header>
        <body>
          <div>
            {firedata}
          </div>
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
          <button onClick={() => writedata(getValue[cardnumber].name)}>送信</button>
          </div>
          <div>
            {renderfire}
          </div>
          <div>
            <Card information={Array.from(new Set(getValue))} parecardnumber={cardnumber} parehandlechange={setcardnumber} roomid={roomid}></Card>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
