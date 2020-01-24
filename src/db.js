import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyCp-vbepKd_gtdlFJHM_wssCpkjbdaUSQo",
    authDomain: "chatapp-esther.firebaseapp.com",
    databaseURL: "https://chatapp-esther.firebaseio.com",
    projectId: "chatapp-esther",
    storageBucket: "chatapp-esther.appspot.com",
    messagingSenderId: "439070258920",
    appId: "1:439070258920:web:8240f00da85a2fc8013b5d",
    measurementId: "G-4S3ZSQPTT4"
  }

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()