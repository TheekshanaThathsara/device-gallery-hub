import { useState } from 'react';

export default function SidebarFilter({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [selectedCapacities, setSelectedCapacities] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);
  
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
    return selectedCategories[categoryId] || expandedSection === 'subcategories';
  };

  // Check if the power bank category is checked to show capacities
  const isCapacityVisible = () => {
    return selectedCategories['power-banks'] || expandedSection === 'capacities';
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    const categoryCount = Object.values(selectedCategories).filter(Boolean).length;
    const subcategoryCount = Object.values(selectedSubcategories).filter(Boolean).length;
    const capacityCount = Object.values(selectedCapacities).filter(Boolean).length;
    const priceModified = priceRange[0] > 0 || priceRange[1] < 200;
    
    return categoryCount + subcategoryCount + capacityCount + (priceModified ? 1 : 0);
  };
  
  // Toggle section expansion for responsive layout
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const isActive = selectedCategories[category.id] || false;
          return (
            <div key={category.id} className="inline-block">
              <button
                onClick={() => handleCategoryChange(category.id, !isActive)}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-600'
                }`}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.name}`}
              >
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Collapsible Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Price Range */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
            aria-expanded={expandedSection === 'price'}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Price Range</span>
            </div>
            <svg className={`w-5 h-5 transition-transform ${expandedSection === 'price' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-3 ${expandedSection === 'price' ? 'block' : 'sm:block hidden'}`}>
            <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 flex items-center pointer-events-none">
                <div className="h-1 bg-blue-100 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="absolute inset-y-0 w-full h-1 bg-transparent appearance-none pointer-events-auto"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="absolute inset-y-0 w-full h-1 bg-transparent appearance-none pointer-events-auto"
                aria-label="Maximum price"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="price-min" className="sr-only">Minimum price</label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price-min"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="block w-full pl-8 pr-2 py-1 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <span className="text-gray-500">to</span>
              <div>
                <label htmlFor="price-max" className="sr-only">Maximum price</label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="price-max"
                    min={priceRange[0]}
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="block w-full pl-8 pr-2 py-1 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sub-categories and Capacities */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <button
            onClick={() => toggleSection('subcategories')}
            className="flex items-center justify-between w-full text-left"
            aria-expanded={expandedSection === 'subcategories'}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Sub-categories</span>
            </div>
            <svg className={`w-5 h-5 transition-transform ${expandedSection === 'subcategories' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`mt-3 ${expandedSection === 'subcategories' || Object.values(selectedCategories).some(Boolean) ? 'block' : 'sm:block hidden'}`}>
            <div className="flex flex-wrap gap-2">
              {subcategories
                .filter(subcategory => Object.keys(selectedCategories)
                  .some(catId => selectedCategories[catId] && subcategory.parent.includes(catId)) || expandedSection === 'subcategories')
                .map(subcategory => {
                  const isActive = selectedSubcategories[subcategory.id] || false;
                  return (
                    <div key={subcategory.id} className="inline-block">
                      <button
                        onClick={() => handleSubcategoryChange(subcategory.id, !isActive)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm'
                            : 'text-gray-600 bg-white border border-gray-200 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        aria-pressed={isActive}
                        aria-label={`Filter by ${subcategory.name}`}
                      >
                        {subcategory.name}
                      </button>
                    </div>
                  );
                })
              }
            </div>
          </div>
          
          {/* Only show capacities if Power Banks is selected or the section is expanded */}
          {(selectedCategories['power-banks'] || expandedSection === 'capacities') && (
            <div className="mt-4">
              <button
                onClick={() => toggleSection('capacities')}
                className="flex items-center justify-between w-full text-left mb-3"
                aria-expanded={expandedSection === 'capacities'}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Power Capacity</span>
                </div>
                <svg className={`w-5 h-5 transition-transform ${expandedSection === 'capacities' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`${expandedSection === 'capacities' ? 'block' : 'sm:block hidden'}`}>
                <div className="flex flex-wrap gap-2">
                  {capacities.map(capacity => {
                    const isActive = selectedCapacities[capacity.id] || false;
                    return (
                      <div key={capacity.id} className="inline-block">
                        <button
                          onClick={() => handleCapacityChange(capacity.id, !isActive)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm'
                              : 'text-gray-600 bg-white border border-gray-200 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                          aria-pressed={isActive}
                          aria-label={`Filter by ${capacity.name}`}
                        >
                          {capacity.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
