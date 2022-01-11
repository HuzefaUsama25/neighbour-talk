const Message = (props) => {
    return (
        <div className="message-box">
            <p>{props.name}</p>
            <p>{props.message}</p>
        </div>

    );
}

export default Message;