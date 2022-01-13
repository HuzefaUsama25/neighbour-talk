import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Keyboard from "./Keyboard";
import Message from "./Message";
import "./css/ChatPage.css"


const ChatPage = () => {
    let { roomid, name } = useParams()

    const [messages, setMessages] = useState([])


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:8082/api/rooms&coords=${roomid}`)
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    setMessages(res)
                })
            console.log("Sent request to get all messages")
        }, 10000)
    }, [messages])



    const addMessage = (message) => {
        const newMessageJson = {
            message: message,
            name: name
        }

        setMessages([...messages, newMessageJson])

        fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessageJson)
        })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="chat-page">
            <div className="btn go-back"><Link to="/">Go Back</Link></div>

            <div className="messages-container">
                {messages.map((message) => {
                    return <div className={`message-container ${message.name === name ? "self" : "other"}`}><Message name={message.name} message={message.message} /></div>
                })}
            </div>

            <Keyboard add={(message) => { addMessage(message) }} />
        </div>
    );
}

export default ChatPage;