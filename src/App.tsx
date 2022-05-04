import { initializeApp } from 'firebase/app';
import React from 'react';
import { useEffect } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import './App.css';
import { Card } from './Card';

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
const database = getDatabase(app)

const writedata = (urls: string) => {
  const db = getDatabase()
  set(ref(db, 'users/' + "123/" + String(Math.floor(Math.random() * 100000))), {
    url: urls
  });
}

const App = () => {

  const [inputvalue, setinputvalue] = React.useState("")
  const [firedata, setfiredata] = React.useState("")

  type restaurantinfo = {
    logo: string,
    name: string,
    photo: string
  }

  type info = {
    restaurants: restaurantinfo[]
  }

  const a: restaurantinfo[] = [{
    name: "a",
    logo: "b",
    photo:"s"
  }]

  const b: info = {
    restaurants:a
  }

  const [getValue, setgetValue] = React.useState<restaurantinfo[]>(a) 



  const dbRef = ref(getDatabase());
  get(child(dbRef, 'users/123')).then((DataSnapshot) => {
    if (DataSnapshot.exists()) {
      // console.log(DataSnapshot.val());
      DataSnapshot.forEach((element: any) => {
        console.log(element.val())
      })


    } else {
      console.log("No data available");
    }
  }
  ).catch((error) => {

  });

  useEffect(() => { 
    const access = async () => {
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
    }
    access();
  }, []);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputvalue(() => e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => writedata(getValue[1].logo)}>送信</button>
      </header>
      <body>
        <div>
          {/* {getValue[1].logo} */}
        </div>
        <div>
          {firedata}
        </div>
      </body>
    </div>
  );
}

export default App;
