import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserPlaces from './pages/UserPlaces';
import Authenticate from './pages/Authenticate';
import AddPlace from './components/AddPlace';
import EditPlace from './components/EditPlace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/places/new" element={<AddPlace />} />
        <Route path="/places/:pid" element={<EditPlace />} />
      </Routes>
    </Router>
  );
}

export default App;
