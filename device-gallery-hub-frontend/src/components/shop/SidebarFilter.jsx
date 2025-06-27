import { useState } from 'react';

export default function SidebarFilter({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [selectedCapacities, setSelectedCapacities] = useState({});
  
  const categories = [
    { id: 'handsfree', name: 'Handsfree' },
    { id: 'data-cables', name: 'Data Cables' },
    { id: 'power-banks', name: 'Power Banks' },
    { id: 'chargers', name: 'Chargers' },
    { id: 'earbuds', name: 'Earbuds' }
  ];
  
  const subcategories = [
    { id: 'micro', name: 'Micro', parent: ['handsfree', 'data-cables'] },
    { id: 'type-c', name: 'Type-C', parent: ['handsfree', 'data-cables', 'chargers'] },
    { id: 'lightning', name: 'Lightning', parent: ['data-cables'] },
    { id: 'wireless', name: 'Wireless', parent: ['earbuds', 'chargers'] },
    { id: 'wired', name: 'Wired', parent: ['earbuds'] }
  ];
  
  const capacities = [
    { id: '5000mah', name: '5000mAh', parent: ['power-banks'] },
    { id: '10000mah', name: '10000mAh', parent: ['power-banks'] },
    { id: '20000mah', name: '20000mAh', parent: ['power-banks'] }
  ];

  // Handle category changes
  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = { ...selectedCategories, [categoryId]: checked };
    setSelectedCategories(newCategories);
    
    // If category is unchecked, also uncheck its subcategories and capacities
    if (!checked) {
      const newSubcategories = { ...selectedSubcategories };
      const newCapacities = { ...selectedCapacities };
      
      subcategories.forEach(subcategory => {
        if (subcategory.parent.includes(categoryId)) {
          newSubcategories[subcategory.id] = false;
        }
      });
      
      capacities.forEach(capacity => {
        if (capacity.parent.includes(categoryId)) {
          newCapacities[capacity.id] = false;
        }
      });
      
      setSelectedSubcategories(newSubcategories);
      setSelectedCapacities(newCapacities);
    }

    // Report filter changes to parent component
    updateFilters(newCategories, selectedSubcategories, selectedCapacities, priceRange);
  };

  // Handle subcategory changes  
  const handleSubcategoryChange = (subcategoryId, checked) => {
    const newSubcategories = { ...selectedSubcategories, [subcategoryId]: checked };
    setSelectedSubcategories(newSubcategories);
    
    // Report filter changes to parent component
    updateFilters(selectedCategories, newSubcategories, selectedCapacities, priceRange);
  };

  // Handle capacity changes
  const handleCapacityChange = (capacityId, checked) => {
    const newCapacities = { ...selectedCapacities, [capacityId]: checked };
    setSelectedCapacities(newCapacities);
    
    // Report filter changes to parent component
    updateFilters(selectedCategories, selectedSubcategories, newCapacities, priceRange);
  };

  // Handle price range changes
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number(e.target.value);
    setPriceRange(newPriceRange);
    
    // Report filter changes to parent component
    updateFilters(selectedCategories, selectedSubcategories, selectedCapacities, newPriceRange);
  };

  const updateFilters = (categories, subcategories, capacities, price) => {
    if (onFilterChange) {
      onFilterChange({
        categories,
        subcategories,
        capacities,
        priceRange: price
      });
    }
  };

  // Check if category has any active subcategories
  const isSubcategoryVisible = (categoryId) => {
    return selectedCategories[categoryId];
  };

  // Check if the power bank category is checked to show capacities
  const isCapacityVisible = () => {
    return selectedCategories['power-banks'];
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-secondary-800 mb-4">Filters</h2>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-700 mb-3">Categories</h3>
        {categories.map(category => (
          <div key={category.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories[category.id] || false}
              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-secondary-700">
              {category.name}
            </label>
          </div>
        ))}
      </div>
      
      {/* Subcategories */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-700 mb-3">Subcategories</h3>
        {subcategories.map(subcategory => (
          <div 
            key={subcategory.id} 
            className={`flex items-center mb-2 ${subcategory.parent.some(p => isSubcategoryVisible(p)) ? '' : 'hidden'}`}
          >
            <input
              type="checkbox"
              id={`subcategory-${subcategory.id}`}
              checked={selectedSubcategories[subcategory.id] || false}
              onChange={(e) => handleSubcategoryChange(subcategory.id, e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              disabled={!subcategory.parent.some(p => isSubcategoryVisible(p))}
            />
            <label 
              htmlFor={`subcategory-${subcategory.id}`} 
              className={`ml-2 text-sm ${subcategory.parent.some(p => isSubcategoryVisible(p)) ? 'text-secondary-700' : 'text-secondary-400'}`}
            >
              {subcategory.name}
            </label>
          </div>
        ))}
      </div>
      
      {/* Power Bank Capacities */}
      <div className={`mb-6 ${isCapacityVisible() ? '' : 'hidden'}`}>
        <h3 className="text-sm font-medium text-secondary-700 mb-3">Capacity</h3>
        {capacities.map(capacity => (
          <div key={capacity.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`capacity-${capacity.id}`}
              checked={selectedCapacities[capacity.id] || false}
              onChange={(e) => handleCapacityChange(capacity.id, e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              disabled={!isCapacityVisible()}
            />
            <label 
              htmlFor={`capacity-${capacity.id}`} 
              className={`ml-2 text-sm ${isCapacityVisible() ? 'text-secondary-700' : 'text-secondary-400'}`}
            >
              {capacity.name}
            </label>
          </div>
        ))}
      </div>
      
      {/* Price Range */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-secondary-700 mb-3">Price Range</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-secondary-500">${priceRange[0]}</span>
          <span className="text-xs text-secondary-500">${priceRange[1]}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-xs text-secondary-800 mr-1">$</span>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-16 px-2 py-1 text-xs border border-gray-200 rounded"
              min="0"
              max={priceRange[1]}
            />
          </div>
          <span className="text-xs text-secondary-500">to</span>
          <div className="flex items-center">
            <span className="text-xs text-secondary-800 mr-1">$</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-16 px-2 py-1 text-xs border border-gray-200 rounded"
              min={priceRange[0]}
              max="200"
            />
          </div>
        </div>
      </div>
      
      <button
        className="w-full py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-800 font-medium text-sm rounded-md transition-colors duration-200"
        onClick={() => {
          // Reset all filters
          setSelectedCategories({});
          setSelectedSubcategories({});
          setSelectedCapacities({});
          setPriceRange([0, 200]);
          updateFilters({}, {}, {}, [0, 200]);
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
}
