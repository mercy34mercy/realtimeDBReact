import React from 'react';
import logo from './logo.svg';
import { useMemo,useState,useEffect,useCallback } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase,ref, set,get,child, DataSnapshot } from "firebase/database";
import './App.css';

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

const writedata = (userid:string) => {
  const db = getDatabase()
  set(ref(db, 'users/' + userid), {
    id:userid
  });
}

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

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => writedata("123")}>あいうえおあおいｓふぁｄそｊふぃｄさお「</button>
        <button onClick={() => dbRef}>あいうえおあおいｓふぁｄそｊふぃｄさお「</button>
      </header>
    </div>
  );
}

export default App;
