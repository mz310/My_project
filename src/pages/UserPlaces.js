import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './UserPlaces.css'; // Optional: Add styles for your component

const UserPlaces = () => {
    const { uid } = useParams(); // Get the user ID from URL
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        // Fetch the list of places from localStorage
        const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
        const userPlaces = storedPlaces.filter(place => place.userId === uid); // Filter places by user ID
        setPlaces(userPlaces);
    }, [uid]);

    return (
        <div className="page-container">
            <h2>Хэрэглэгчийн газрын жагсаалт: {uid}</h2>
            {places.length > 0 ? (
                <ul>
                    {places.map((place) => (
                        <li key={place.id}>
                            <h3>{place.title}</h3>
                            <p>{place.description}</p>
                            <p>Байршил: {place.address}</p>
                            {place.image && <img src={place.image} alt={place.title} className="place-image" />} {/* Display the image */}
                            <Link to={`/places/${place.id}/edit`} className="btn">Засах</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Одоогоор газар нэмэгдээгүй байна.</p>
            )}
            <Link to={`/places/new/${uid}`} className="btn">Газар нэмэх</Link>
        </div>
    );
};

export default UserPlaces;
