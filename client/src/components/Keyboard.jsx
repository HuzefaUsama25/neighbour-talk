import { useState } from "react";

const Keyboard = (props) => {

    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.add(message)
        setMessage("")
    }



    return (
        <form onSubmit={handleSubmit}>
            <input required type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
            <input type="submit" value="send" />
        </form>
    );
}

export default Keyboard;