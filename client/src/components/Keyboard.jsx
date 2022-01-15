import { useState } from "react";
import "./css/Keyboard.css"

const Keyboard = (props) => {

    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.add(message)
        setMessage("")
    }



    return (
        <div className="keyboard">
            <form onSubmit={handleSubmit}>
                <input required type="text" value={message} onChange={(e) => { setMessage(e.target.value) }}></input>
                <input type="submit" value="Send"></input>
            </form>
        </div>

    );
}

export default Keyboard;