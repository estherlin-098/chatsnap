import React, {useState, useEffect} from 'react';
import './App.css';
import './media.css'
import NamePicker from './namePicker.js'
import {db, useDB} from './db.js'
import {BrowserRouter, Route} from 'react-router-dom'
import {FiCamera} from 'react-icons/fi'
import Camera from 'react-snap-pic'
import "firebase/storage"
import * as firebase from "firebase/app"
import Div100vh from 'react-div-100vh'


function App() {
  useEffect(()=>{ //run this only one time when starting it
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  },[])

  return <BrowserRouter>
    <Route path="/:room" component={Room} />
  </BrowserRouter>
}

function Room(props) {
  //const [messages, setMessages] = useState([]) //put in the initial value in the () message = []-empty array, (variable, function that use to change the variable)
  const {room} = props.match.params
  const [name, setName] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const messages = useDB(room) //takes an argument
  
  async function takePicture(img) { //async - you can use await, wait the line to be done and then move on
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }

  return <Div100vh>

    {showCamera && <Camera takePicture={takePicture} />} 

    <header>
    <div className="logo-wrap">
        <img className="logo"
          alt="logo"
          src="https://images.coollogo.com/images/prism-large-green.png" 
        />
        Chatsnap
      </div>
      <NamePicker onSave={setName} />
    </header>
  
    <div className="messages">
      {messages.map((m,i)=><Message key={i} 
      m={m} name={name} 
      />)}
    </div>
    
    <TextInput showCamera={()=>setShowCamera(true)} 
    onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }} 
    /> 


  </Div100vh>
 }
 
 const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatapp-esther.appspot.com/o/'
 const suffix = '.jpg?alt=media'

 function Message({m,name}) {
  return <div className="message-wrap"
    from={m.name===name?'me':'you'} 
    onClick={()=>console.log(m)}>
    <div className="message">
      <div className="msg-name">{m.name}</div>
      <div className="msg-text">
        {m.text}
        {m.img && <img src={bucket + m.img + suffix} alt="pic" />}
      </div>
    </div>
  </div>
 }

 function TextInput(props) {
   const [text,setText] = useState('') //const[variable,function]
  
   return <div className = "text-input" >

     <button 
      onClick={props.showCamera}
       style={{position: 'relative', left:0, right:'auto'}}>
       <FiCamera style={{height:22, width:22}} />
     </button>
     
     <input value={text} //control Component
     placeholder = "Write your message" 
     onChange = {e=> setText(e.target.value)} //e = event, capture the input, fat arrow - that's a function
     /> 
 
     <button onClick={()=> {
       if (text)props.onSend(text) //if there text, send massage
       setText('')
       }}> 
       <img className = "sendButton" alt="button"
       disabled = {!text}    //if there is no text, disable button
       src="https://static.thenounproject.com/png/59763-200.png" />
     </button>

   </div>
 }
export default App;
