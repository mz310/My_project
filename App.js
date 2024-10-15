import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authenticate from './pages/Authenticate';
import UserPlaces from './pages/UserPlaces';
import AddPlace from './pages/AddPlace';
import EditPlace from './pages/EditPlace';
import Home from './pages/Home';
import NavBar from './components/Navbar';  // Import the NavBar

function App() {
  return (
    <Router>
      <NavBar /> {/* Add NavBar here so it appears on every page */}
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/places/new/:uid" element={<AddPlace />} />
        <Route path="/places/:pid/edit" element={<EditPlace />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
