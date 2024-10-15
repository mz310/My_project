import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Нүүр хуудас</Link>
        </li>
        <li>
          <Link to="/authenticate">Нэвтрэх</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
