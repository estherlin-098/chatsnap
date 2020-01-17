import React, {useState} from 'react';
import './App.css';

function App() {
  return <main>
  
    <header>
      <img className="logo"
        alt="logo"
        src="https://www.plantronics.com/etc/designs/plantronics/clientlib-all/img/poly-logo.png"
      />
      Chatter
    </header>
  
    <TextInput onSend={t=> console.log(t)} />
  
  </main>
 }
 
 function TextInput(props) {
   const [text,setText] = useState('') //const[variable,function]
 
   return <div className = "text-input">
     <input value={text} 
     placeholder = "Write your message" 
     onChange = {e=> setText(e.target.value)} //e = event, capture the input
     /> 
 
     <button className = "button" 
       onClick={()=> {
       props.onSend(text)
       setText('')
       }}> 
       <img className = "sendButton" 
       src="https://static.thenounproject.com/png/59763-200.png" />
     </button>
   </div>
 }
 

export default App;
