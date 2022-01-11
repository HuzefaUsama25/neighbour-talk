import { useParams } from "react-router-dom";

const ChatPage = () => {
    let { lat, lon } = useParams()

    return (
        <div className="chat-page">
            <h1>Chat Page</h1>
            <p>{lat}<br />{lon}</p>
        </div>

    );
}

export default ChatPage;