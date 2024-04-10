import { useState, useEffect } from 'react';
import Petlist from './components/Petlist';
import Owners from './components/Owners';
import Navbar from './components/Navbar';
import AddForm from './components/AddForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/pets');
        const petData = await res.json();
        setPets(petData);
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchPets();
  }, []);
  return (
    <>
      <Navbar />
      <div id="app">
        <h1> Welcome to Petfinder</h1>
        <Routes>
          <Route path="/" element={<Petlist pets={pets} />} />
          <Route path="/owners" element={<Owners pets={pets} />} />
          <Route path="/add" element={<AddForm pets={pets} setPets={setPets} />} />

        </Routes>
      </div>
    </>

  )
}

export default App
