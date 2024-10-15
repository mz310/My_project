import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ComponentStyle.css';

const EditPlace = () => {
  const { pid } = useParams(); // Get the place ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null); // State to hold the image
  const [error, setError] = useState(''); // State to hold error messages

  useEffect(() => {
    // Fetch the place data from localStorage based on the place ID (pid)
    const places = JSON.parse(localStorage.getItem('places')) || [];
    const placeToEdit = places.find(place => place.id === parseInt(pid));

    if (placeToEdit) {
      setTitle(placeToEdit.title);
      setDescription(placeToEdit.description);
      setAddress(placeToEdit.address);
      setImage(placeToEdit.image); // Set existing image
    } else {
      setError('Газар олдсонгүй!'); // Set error message if place is not found
    }
  }, [pid]);

  const handleUpdatePlace = (e) => {
    e.preventDefault();

    // Get the current list of places from localStorage
    const places = JSON.parse(localStorage.getItem('places')) || [];

    // Check if the place is found and update it
    const updatedPlaces = places.map(place => {
      if (place.id === parseInt(pid)) {
        // Return the updated place object
        return {
          ...place, // Keep the existing properties
          title,     // Update title
          description, // Update description
          address,   // Update address
          image      // Update image
        };
      }
      return place; // Return the original place if not editing
    });

    // Save the updated list back to localStorage
    localStorage.setItem('places', JSON.stringify(updatedPlaces));

    // Navigate back to the user's places page
    const userId = places.find(place => place.id === parseInt(pid)).userId; // Retrieve the userId from the original place
    navigate(`/${userId}/places`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image state to the file's data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <h2>Газар өөрчлөх</h2>
      {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
      <form onSubmit={handleUpdatePlace}>
        <input
          type="text"
          placeholder="Гарчиг"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Байршил"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <textarea
          placeholder="Тайлбар"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        
        {/* Image Upload Section */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <img src={image} alt="Preview" className="image-preview" />} {/* Show image preview */}

        <button type="submit" className="btn">Хадгалах</button>
      </form>
    </div>
  );
};

export default EditPlace;
