import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import io from "socket.io-client";

import InfoBar from '../Infobar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

import './chat.css'

const ENDPOINT = "http://localhost:5000";

let socket;  


const Chat = () => {

    const[name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');


    const [searchParams] = useSearchParams();
    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);
        let params = new URLSearchParams(currentParams);
        
        socket = io(ENDPOINT);
        //console.log(params.get('name '), params.get('room ')); //koko room
        
        const name = params.get('name ');
        const room = params.get('room ')

        setName(name);
        setRoom(room);

        
        socket.emit('join', {name, room}, (error)=>{
            if(error){
                alert(error);
            }
        });

        

        //console.log(socket);

         // get new values onchange
      }, [ENDPOINT, searchParams]); 

      useEffect(()=>{
          socket.on('message', message=>{
               setMessages(messages=>[...messages, message]);
          })
          
          socket.on("roomData", ({users})=>{
              setUsers(users);
          })

      }, [])
    
    //function to send message on pressing Enter

    const sendMessage = (event)=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    console.log(message, messages);


    return (
        <div className="outerContainer">
            <div className="container" >
                 <InfoBar room = {room}/>
                 <Messages messages = {messages} name = {name}/>
                 <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage}
                 />

                {/*<input value={message} onChange={(event)=> setMessage(event.target.value)} 
                onKeyPress={(event)=> event.key==='Enter'? sendMessage(event):null}
    />*/}
            </div>
        </div>
    )
}

export default Chat
