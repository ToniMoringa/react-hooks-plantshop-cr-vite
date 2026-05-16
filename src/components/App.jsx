import { useState, useEffect } from 'react';
import Header from './components/Header';
import PlantPage from './components/PlantPage';

function App() {
  // State for plants
  const [plants, setPlants] = useState([]);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch plants on page load
  useEffect(() => {
    fetchPlants();
  }, []);

  // Function to fetch all plants from backend
  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:6001/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  //  add a new plant
  const addPlant = async (newPlant) => {
    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      });
      const savedPlant = await response.json();
      setPlants([...plants, savedPlant]);
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  //  update plant's inStock status
  const updatePlantStock = async (id, inStock) => {
    try {
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inStock }),
      });
      const updatedPlant = await response.json();
      
      //  plant in state
      const updatedPlants = plants.map(plant => 
        plant.id === id ? updatedPlant : plant
      );
      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error updating plant stock:', error);
    }
  };

  // Filter plants based on search term
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <PlantPage 
        plants={filteredPlants}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onAddPlant={addPlant}
        onUpdateStock={updatePlantStock}
      />
    </div>
  );
}

export default App;