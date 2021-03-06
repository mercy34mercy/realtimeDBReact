import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import './Tinder.css'
import { getDatabase, ref, set } from "firebase/database";

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

function Advanced (props) {
  let db = props.db
  // console.log("db",db)
  let dbLength = db.length
  // console.log("length", dbLength)
  const [currentIndex, setCurrentIndex] = useState(dbLength - 1)
  const [lastDirection, setLastDirection] = useState()
  const [currenttime, setCurrenttime] = useState(Date.now())
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const currentTimeRef    = useRef(currenttime)

  const childRefs = useMemo(
    () =>
      Array(dbLength)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentTime = (time) => {
    setCurrenttime(time)
    currentTimeRef.current = time
  }

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < dbLength - 1

  const canSwipe = currentIndex >= 0

  const axios = require('axios');
// https://hotpeppertabecard.azurewebsites.net
  const sendtime =  (id, time) => {
    const url = "http://127.0.0.1:5000/time"
    const json = {resid: id,time: String(time)}
        axios.post(url,json)
      .then(() => {
        console.log("sccsess")
      })
    }

  const writedata = (name,time) => {
    const firedb = getDatabase()
    if (props.id === undefined || props.id.length < 1) {
      console.log("ルームIDが設定されていません")
    } else {
      console.log("送信")
      set(ref(firedb, 'users/' + String(props.id) + "/" + String(Math.floor(Math.random() * 100000))), {
        restrauntname: name,
        time: time
      });
    }
  }

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete,id, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    
    const time = Date.now()
    const elapsedtime = time - currentTimeRef.current
    console.log("経過時間", elapsedtime/1000)
    updateCurrentTime(time)
    if (direction === "right"){
      writedata(nameToDelete, elapsedtime)
      // sendtime(id,elapsedtime)
    }


  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
    // ここで方向を取得して通信する

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < dbLength) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='Tinder'>
      {/* <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      /> */}
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name,character.id, index)}
            onCardLeftScreen={() => {outOfFrame(character.name, index);console.log(character);console.log("lastDirection");console.log(lastDirection)}}
          >
            <div
              style={{ backgroundImage: 'url(' + character.photo + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  )
}

export default Advanced