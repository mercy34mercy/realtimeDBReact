import { initializeApp } from 'firebase/app';
import React from 'react';
import { useEffect } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import './App.css';
import axios from 'axios';
import { Card } from './Card';
import { InferTypeNode } from 'typescript';
import { async } from '@firebase/util';

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

const writedata = (userid: string) => {
  const db = getDatabase()
  set(ref(db, 'users/' + "123/" + String(Math.floor(Math.random() * 100000))), {
    id: userid
  });
}

const App = () => {

  const [inputvalue, setinputvalue] = React.useState("")
  const [restauraunt, setrestaurant] = React.useState("")

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

  const [getValue, setgetValue] = React.useState<info>(b) 



  const dbRef = ref(getDatabase());
  get(child(dbRef, 'users/123')).then((DataSnapshot) => {
    if (DataSnapshot.exists()) {
      console.log(DataSnapshot.val());
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
      console.log("body",body)
      const res = JSON.parse(JSON.stringify(body)) as info
      setgetValue(res)
      console.log("rest", res)
      getValue.restaurants.forEach((game, index) => {
        console.log("logo",game)
      })
    }
    access();
  }, []);

  useEffect(() => {
    const a = dbRef;

  })

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputvalue(() => e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <input type="text" value={inputvalue} onChange={handleChange} />
        <button onClick={() => writedata(inputvalue)}>{inputvalue}</button>
        <button onClick={() => dbRef}>フェッチ</button> */}
      </header>
      <body>
        <div>
        {String(getValue.restaurants[1])}
        </div>
      </body>
    </div>
  );
}

export default App;
