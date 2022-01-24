import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import io from "socket.io-client";

var socket;  


const Chat = () => {

    const[name, setName] = useState('');
    const [room, setRoom] = useState('');
    


    const [searchParams] = useSearchParams();
    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);
        let params = new URLSearchParams(currentParams);
        
        socket = io('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']});
        //console.log(params.get('name '), params.get('room ')); //koko room

        setName(params.get('name '));
        setRoom(params.get('room '))

        console.log(socket);
         // get new values onchange
      }, [searchParams]); 
    
    

    return (
        <div>
            chat
        </div>
    )
}

export default Chat
