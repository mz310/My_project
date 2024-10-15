import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddPlace.css'; // Optional: Add styles for your component

const AddPlace = () => {
  const { uid } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null); // State for the image file

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new place object
    const newPlace = {
      id: new Date().getTime(), // Unique ID
      userId: uid,
      title,
      description,
      address,
      image: image ? URL.createObjectURL(image) : null // Create a URL for the image
    };

    // Save the place to localStorage
    const existingPlaces = JSON.parse(localStorage.getItem('places')) || [];
    existingPlaces.push(newPlace);
    localStorage.setItem('places', JSON.stringify(existingPlaces));

    alert('Place added successfully!');
    navigate(`/${uid}/places`); // Redirect to user's places
  };

  return (
    <div className="add-place-container">
      <h2>Газар нэмэх</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Газарын нэр"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Тодорхойлолт"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Байршил"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*" // Accepts image files only
          onChange={handleImageChange}
          required
        />
        <button type="submit" className="btn">Нэмэх</button>
      </form>
    </div>
  );
};

export default AddPlace;
