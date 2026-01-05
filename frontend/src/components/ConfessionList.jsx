import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { confessionAPI } from '../services/api';
import ConfessionCard from './ConfessionCard';
import CategoryFilter from './CategoryFilter';
import { FiRefreshCw, FiInbox } from 'react-icons/fi';
import '../styles/App.css';

const ConfessionList = () => {
  const { confessions, setConfessions } = useSocket();
  const [filteredConfessions, setFilteredConfessions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchConfessions();
  }, []);

  useEffect(() => {
    let filtered = [...confessions];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(conf => conf.category === selectedCategory);
    }
    
    // Sort
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    }
    
    setFilteredConfessions(filtered);
  }, [confessions, selectedCategory, sortBy]);

  const fetchConfessions = async () => {
    try {
      setIsLoading(true);
      const response = await confessionAPI.getAll();
      setConfessions(response.data);
    } catch (error) {
      console.error('Failed to fetch confessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchConfessions();
  };

  const categories = ['All', 'General', 'Love', 'College', 'Career', 'Family', 'Mental Health'];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading confessions...</p>
      </div>
    );
  }

  return (
    <div className="confession-list">
      <div className="list-header">
        <div className="header-left">
          <h2>Latest Confessions</h2>
          <span className="confession-count">
            {filteredConfessions.length} confessions
          </span>
        </div>
        
        <div className="header-right">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
          </select>
          
          <button onClick={handleRefresh} className="refresh-btn">
            <FiRefreshCw />
          </button>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredConfessions.length === 0 ? (
        <div className="empty-state">
          <FiInbox size={48} />
          <h3>No confessions yet</h3>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="confessions-grid">
          {filteredConfessions.map((confession) => (
            <ConfessionCard key={confession._id} confession={confession} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionList;