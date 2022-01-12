import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./css/HomePage.css"


const Home = () => {
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [location, setLocation] = useState('')
    const [name, setName] = useState('')


    const getLocationCoords = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLat(pos.coords.latitude)
            setLon(pos.coords.longitude)
        });
    }



    const getPlace = () => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`)
            .then((response) => {
                return response.json()
            })
            .then((body) => {
                setLocation(body.display_name)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        getLocationCoords()
        getPlace()

    }, [lat, lon])

    return (
        <div className="home-page">
            <h1>Home Page</h1>
            <p><strong>{location}</strong></p>

            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />

            <Link to={`/chat/roomid=${Math.round(lat)}x${Math.round(lon)}&name=${name}`}>Start Chat</Link>
        </div >
    );
}

export default Home;