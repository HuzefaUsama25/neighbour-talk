import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';

const Home = () => {
	const [lat, setLat] = useState('');
	const [lon, setLon] = useState('');
	const [geoLocation, setGeoLocation] = useState('');
	const [name, setName] = useState(`nameless`);

	const getLocationCoords = () => {
		navigator.geolocation.getCurrentPosition((pos) => {
			console.log(pos.coords);
			let my_lat = Number(pos.coords.latitude.toString().slice(0, 7));
			let my_lon = Number(pos.coords.longitude.toString().slice(0, 7));

			setLat(my_lat);
			setLon(my_lon);

			fetch(
				`https://nominatim.openstreetmap.org/reverse?lat=${my_lat}&lon=${my_lon}&format=jsonv2`
			)
				.then((response) => {
					return response.json();
				})
				.then((body) => {
					setGeoLocation(body.display_name);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	useEffect(() => {
		getLocationCoords();
	}, []);

	return (
		<div className="home-page">
			<div className="location">{geoLocation}</div>

			<div className="form-container">
				<h2>Enter a name</h2>
				<input
					type="text"
					name="name"
					required
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<Link
					to={`/chat`}
					state={{
						name: `${name}#${Math.round(Math.random() * 10000)}`,
						roomid: `${lat}x${lon}`,
						geoLocation: geoLocation,
					}}
				>
					<div className="start-btn">Start Chat</div>
				</Link>
			</div>
		</div>
	);
};

export default Home;
