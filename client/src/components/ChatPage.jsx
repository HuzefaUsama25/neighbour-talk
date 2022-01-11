import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Keyboard from "./Keyboard";
import Message from "./Message";

const ChatPage = () => {
    let { lat, lon, name } = useParams()

    const [messages, setMessages] = useState([
        { "name": "huzefa", "message": "Hello Mama" },
        { "name": "filza", "message": "Hello Filza" },
        { "name": "umer", "message": "Hello Umer" },
        { "name": "tanveer", "message": "Hello Tanveer" },
        { "name": "usama", "message": "Hello Huzefa" }
    ])

    const addMessage = (message) => {
        setMessages([[...messages] + {"name":name, "message":message}])
    }

    return (
        <div className="chat-page">
            <Link to="/">Go Back</Link>
            <h1>Chat Page</h1>
            <p>{lat}<br />{lon}<br />{name}</p>
            <br />
            <hr />
            {messages.map((message) => {
                return <><Message name={message.name} message={message.message} /><br /></>
            })}
            <hr />
            <Keyboard add={(message)=>{addMessage(message)}} />
        </div>
    );
}

export default ChatPage;