import React, {useState} from 'react';
import './App.css';

function NamePicker(props) {
    const [name, setName] = useState(false)
    
    return <div className = "edit-username" >
    <input value={editName} //control Component
    placeholder = "Set Username" 
    onChange = {e=> setEditName(e.target.value)} //e = event, capture the input, fat arrow - that's a function
    />

    <button className = "name-button" 
       onClick={()=> {
        if (editName)props.onSend(editName)
       setEditName('')
       }}> 
       <img className = "sendButton" alt="button"
       src="https://image.flaticon.com/icons/png/512/84/84380.png" />
    </button>
    </div>
}

export default NamePicker;