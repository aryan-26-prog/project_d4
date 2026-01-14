import React, { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { confessionAPI } from '../services/api';
import ConfessionCard from './ConfessionCard';
import CategoryFilter from './CategoryFilter';
import { FiRefreshCw, FiInbox } from 'react-icons/fi';
import '../styles/App.css';

const ConfessionList = () => {
  const { socket, confessions, setConfessions } = useSocket();
  const [filteredConfessions, setFilteredConfessions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');

  // Add socket listeners in ConfessionList itself
  useEffect(() => {
    if (!socket) return;

    const handleLikeUpdate = (updatedConfession) => {
      console.log('Like update in ConfessionList:', updatedConfession);
      
      setConfessions(prev => {
        const updated = prev.map(conf => 
          conf._id === updatedConfession._id 
            ? { ...conf, likes: updatedConfession.likes }
            : conf
        );
        
        // Force update by creating new array
        return [...updated];
      });
    };

    const handleReactionUpdate = (updatedConfession) => {
      setConfessions(prev => 
        prev.map(conf => 
          conf._id === updatedConfession._id 
            ? { ...conf, reactions: updatedConfession.reactions }
            : conf
        )
      );
    };

    socket.on('update_likes', handleLikeUpdate);
    socket.on('reaction_update', handleReactionUpdate);

    return () => {
      socket.off('update_likes', handleLikeUpdate);
      socket.off('reaction_update', handleReactionUpdate);
    };
  }, [socket, setConfessions]);

  useEffect(() => {
    fetchConfessions();
  }, []);

  useEffect(() => {
    let filtered = [...confessions];
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(conf => conf.category === selectedCategory);
    }
    
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
            <ConfessionCard 
              key={confession._id} 
              confession={confession}
              // Pass socket as prop for better updates
              socket={socket}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionList;