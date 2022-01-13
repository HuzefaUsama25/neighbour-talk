import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./css/HomePage.css"


const Home = () => {
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [location, setLocation] = useState('')
    const [name, setName] = useState(`person-${Math.round(Math.random() ** 10)}`)


    const getLocationCoords = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setLat(Math.round((pos.coords.latitude + Number.EPSILON) * 100) / 100)
            setLon(Math.round((pos.coords.longitude + Number.EPSILON) * 100) / 100)
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
            <h1>{lat}, {lon}</h1>
            <h1>Home Page</h1>
            <p><strong>{location}</strong></p>

            <label htmlFor="name">Name</label>
            <input type="text" name="name" required value={name} onChange={(e) => { setName(e.target.value) }} />

            <Link to={`/chat/roomid=${lat}x${lon}&name=${name}`}>Start Chat</Link>
        </div >
    );
}

export default Home;