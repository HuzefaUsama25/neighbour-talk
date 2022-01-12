import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Keyboard from "./Keyboard";
import Message from "./Message";
import "./css/ChatPage.css"


const ChatPage = () => {
    let { roomid, name } = useParams()

    const [messages, setMessages] = useState([
        { "name": "huzefa", "message": "Hello Mama" },
        { "name": "filza", "message": "Hello Filza" },
        { "name": "umer", "message": "Hello Umer" },
        { "name": "tanveer", "message": "Hello Tanveer" },
        { "name": "usama", "message": "Hello Huzefa" }
    ])


    useEffect(() => {
        console.log("Register new user to room")

        return () => {
            console.log("REmove User")
        }
    }, [])

    useEffect(() => {
        console.log("Send my messages to room server")
        console.log("Get all room messages from server")
    }, [messages])

    useEffect(() => {
        console.log("Get all room messages from server")
    })


    const addMessage = (message) => {
        if (messages.length > 5) {
            setMessages([...messages.slice(1), { "name": name, "message": message }])
        }
        else {
            setMessages([...messages, { "name": name, "message": message }])
        }
    }


    return (
        <div className="chat-page">
            <div className="btn go-back"><Link to="/">Go Back</Link></div>
            <p>{roomid}<br />{name}</p>


            <div className="messages-container">
                {messages.map((message) => {
                    return <div className="message-container"><Message name={message.name} message={message.message} /></div>
                })}
            </div>

            <Keyboard add={(message) => { addMessage(message) }} />
        </div>
    );
}

export default ChatPage;