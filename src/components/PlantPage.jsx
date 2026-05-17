import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

function PlantPage({
  plants,
  searchTerm,
  onSearch,
  onAddPlant,
  onUpdateStock,
}) {
  return (
    <main>
      <NewPlantForm onAddPlant={onAddPlant} />
      <Search searchTerm={searchTerm} onSearch={onSearch} />
      <PlantList plants={plants} onUpdateStock={onUpdateStock} />
    </main>
  );
}

export default PlantPage;
