import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Keyboard from "./Keyboard";
import Message from "./Message";
import "./css/ChatPage.css"


const ChatPage = () => {
    let { roomid, name } = useParams()

    const [messages, setMessages] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [requestSent, setRequestSent] = useState(0)


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    setMessages(res)
                    setIsPending(false)
                    setRequestSent(requestSent + 1)
                })
            console.log("Sent request to get all messages")
        }, 5000)
    }, [requestSent])


    useEffect(() => {
        fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            })
            .then(res => {
                setMessages(res)
                setIsPending(false)
            })
        console.log("Sent request to get all messages")

    }, [])



    const addMessage = (message) => {
        const newMessageJson = {
            message: message,
            name: name
        }

        setMessages([...messages.slice(messages.length - 9), newMessageJson])

        fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMessageJson)
        })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {isPending ? <h1>loading</h1> :
                <div className="chat-page">
                    <div className="btn go-back"><Link to="/">Go Back</Link></div>

                    <div className="messages-container">
                        {messages.map((message) => {
                            return <div className={`message-container ${message.name === name ? "self" : "other"}`}><Message name={message.name} message={message.message} key={message._id} /></div>
                        })}
                    </div>

                    <Keyboard add={(message) => { addMessage(message) }} />
                </div>
            }
        </>
    );
}

export default ChatPage;