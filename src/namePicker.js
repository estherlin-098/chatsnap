import React, {useState,useRef} from 'react';
import './App.css';
import {FiEdit, FiSave} from 'react-icons/fi';

function NamePicker (props) {
    const [name, setName] = useState('')
    const [showName, setShowName] = useState(false)
    const inputEl = useRef(null)

    function save() {
        inputEl.current.focus ()
        if(name && !showName) {
            props.onSave(name)   
        } 
        setShowName(!showName)  
    }

    return <div className = "edit-username">
        <input value={name} ref={inputEl}
        className = "name-input"
        style = {{display: showName ? 'none' : 'flex'}}
        onChange = {e=> setName(e.target.value)}
        onKeyPress={e=> { // press the button
            if(e.key === 'Enter') save() //Check whether you press the button, Save username outside of the conponent
        }}
        />

        {showName && <div>{name}</div>}

        <button className = "name-button"
            onClick={save}
        > 
            {showName ? <FiEdit /> : <FiSave />}
        </button>
    </div>
}

export default NamePicker