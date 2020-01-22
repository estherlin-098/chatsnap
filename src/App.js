import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './namePicker.js'
import {db} from './db.js'

function App() {
  const [messages, setMessages] = useState([]) //put in the initial value in the () message = []-empty array, (variable, function that use to change the variable)
  const [name, setName] = useState('')

  useEffect(()=>{ //anytime there is a new receive function, give it an array of message
    db.listen({
      receive: m=> {
        setMessages(current=> [m, ...current])
      },
    })
  }, [])

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
  
  <div className={"messages"}>
    {messages.map((m,i)=>{
         return <div key={i} className="message-wrap">
         <div className="message">{m.text}</div>
      </div>
  })} 
  </div>
    
  
    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(),
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
