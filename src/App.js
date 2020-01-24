import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './namePicker.js'
import {db, useDB} from './db.js'
import {BrowserRouter, Route} from 'react-router-dom'

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
  const messages = useDB(room) //takes an argument

  return <main>
  
    <header>
    <div className="logo-wrap">
        <img className="logo"
          alt="logo"
          src="https://images.coollogo.com/images/prism-large-green.png" 
        />
        Chatter
      </div>
      <NamePicker onSave={setName} />
    </header>
  
    <div className="messages">
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap"
          from={m.name===name?'me':'you'}> 
          <div className="message">
            <div className="msg-name">{m.name}</div>
            <div className="msg-text">{m.text}</div>
          </div>
        </div>
      })}
    </div>
    
    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }} /> 
  
  </main>
 }
 
 function TextInput(props) {
   const [text,setText] = useState('') //const[variable,function]

   return <div className = "text-input" >
     <input value={text} //control Component
     placeholder = "Write your message" 
     onChange = {e=> setText(e.target.value)} //e = event, capture the input, fat arrow - that's a function
     /> 
 
     <button className = "button" 
       onClick={()=> {
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
