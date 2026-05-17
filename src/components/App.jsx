import { useState, useEffect } from 'react';
import Header from './Header';
import PlantPage from './PlantPage';

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:6001/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  const addPlant = async (newPlant) => {
    const response = await fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlant),
    });

    const savedPlant = await response.json();
    setPlants([...plants, savedPlant]);
  };

  const updatePlantStock = async (id, inStock) => {
    // Update local state immediately for better UX
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, inStock } : plant,
    );
    setPlants(updatedPlants);

    // Then update the server
    try {
      await fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inStock }),
      });
    } catch (error) {
      console.error('Error updating plant stock:', error);
    }
  };

  const filteredPlants = plants.filter((plant) => {
    if (!plant || !plant.name) return false;
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
