import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Keyboard from './Keyboard';
import Message from './Message';
import Loading from './Loading';
import './css/ChatPage.css';
const Filter = require('bad-words');

const ChatPage = (props) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { roomid, name, geoLocation } = location.state;

	const [messages, setMessages] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const filter = new Filter();

	useEffect(() => {
		if (roomid.length < 5) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			})
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					setMessages(res);
					setIsPending(false);
				});
			console.log('Sent request to get all messages');
		}, 5000);
	}, [messages]);

	const addMessage = (message) => {
		let verifiedMessage = filter.clean(message);

		const newMessageJson = {
			message: verifiedMessage,
			name: name,
		};

		if (messages.length > 10) {
			setMessages([...messages.slice(1, messages.length), newMessageJson]);
		}

		if (messages.length < 9) {
			setMessages([...messages, newMessageJson]);
		}

		fetch(`http://localhost:8082/api/rooms&coords=${roomid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(newMessageJson),
		}).catch((err) => {
			console.log(err);
		});
	};

	return (
		<>
			{isPending ? (
				<Loading />
			) : (
				<div className="chat-page">
					<div className="header">
						<Link to="/">
							<div className="btn-go-back fas fa-arrow-left"></div>
						</Link>
						<div className="geolocation">{geoLocation}</div>
					</div>

					<div className="messages-container">
						{messages.map((message) => {
							return (
								<div
									className={`message-container ${
										message.name === name ? 'self' : 'other'
									}`}
								>
									<Message
										name={message.name}
										message={message.message}
										key={message._id}
									/>
								</div>
							);
						})}
					</div>

					<Keyboard
						add={(message) => {
							addMessage(message);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default ChatPage;
