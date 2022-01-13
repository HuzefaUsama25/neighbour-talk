const Message = (props) => {
    return (
        <div className={`message-box`}>
            <p className="user-name">{props.name}</p>
            <p className="message-text">{props.message}</p>
        </div>

    );
}

export default Message;