import React from 'react';
import '../styles/App.css';

const categories = ['All', 'General', 'Love', 'College', 'Career', 'Family', 'Mental Health'];

const CategoryFilter = ({ selectedCategory, onSelectCategory, confessionCount = 0 }) => {
  return (
    <div className="category-filter-section">
      <div className="category-filter-container">
        <div className="category-filter-title">
          Filter by Category
        </div>
        
        <div className="category-filter-grid">
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => onSelectCategory(category)}
              className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
              aria-label={`Filter by ${category}`}
              aria-pressed={selectedCategory === category}
            >
              <span className="category-icon"></span>
              <span className="category-text">{category}</span>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default CategoryFilter;