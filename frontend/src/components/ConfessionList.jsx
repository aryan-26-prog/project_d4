import React, { useEffect, useMemo, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { confessionAPI } from '../services/api';
import ConfessionCard from './ConfessionCard';
import CategoryFilter from './CategoryFilter';
import { FiRefreshCw, FiInbox } from 'react-icons/fi';
import '../styles/App.css';

const ConfessionList = () => {
  const { confessions, setConfessions } = useSocket();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchConfessions();
  }, []);

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

  const filteredConfessions = useMemo(() => {
    let data = [...confessions];

    if (selectedCategory !== 'All') {
      data = data.filter(conf => conf.category === selectedCategory);
    }

    if (sortBy === 'latest') {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      data.sort((a, b) => b.likes - a.likes);
    }

    return data;
  }, [confessions, selectedCategory, sortBy]);

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
        <h2>Latest Confessions</h2>

        <div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
          </select>

          <button onClick={fetchConfessions}>
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
        </div>
      ) : (
        <div className="confessions-grid">
          {filteredConfessions.map(conf => (
            <ConfessionCard key={conf._id} confession={conf} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionList;
