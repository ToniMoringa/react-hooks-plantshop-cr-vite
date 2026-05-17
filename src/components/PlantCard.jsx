import { useState } from 'react';

function PlantCard({ plant, onUpdateStock }) {
  const [inStock, setInStock] = useState(true);

  const handleClick = () => {
    setInStock(false);
    onUpdateStock(plant.id, false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button onClick={handleClick}>In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
