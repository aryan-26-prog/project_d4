import React, { useEffect, useState } from 'react';
import { confessionAPI } from '../services/api';

const ConfessionCard = ({ confession: initialConfession, socket }) => {
  const [confession, setConfession] = useState(initialConfession);
  const [isLiking, setIsLiking] = useState(false);

  // ✅ Listen for updates directly in card
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (updatedConfession) => {
      if (updatedConfession._id?.toString() === confession._id?.toString()) {
        console.log('ConfessionCard: Updating', confession._id);
        setConfession(prev => ({
          ...prev,
          likes: updatedConfession.likes,
          reactions: updatedConfession.reactions || prev.reactions
        }));
      }
    };

    socket.on('update_likes', handleUpdate);
    socket.on('reaction_update', handleUpdate);

    return () => {
      socket.off('update_likes', handleUpdate);
      socket.off('reaction_update', handleUpdate);
    };
  }, [socket, confession._id]);

  // Update if initial confession prop changes
  useEffect(() => {
    setConfession(initialConfession);
  }, [initialConfession]);

  const handleLike = async () => {
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      await confessionAPI.like(confession._id);
      
      // Optimistic update
      setConfession(prev => ({
        ...prev,
        likes: prev.likes + 1
      }));
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="confession-card">
      <div className="card-header">
        <span className="category-badge">{confession.category}</span>
        <span className="timestamp">
          {new Date(confession.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <p className="confession-text">{confession.text}</p>
      
      <div className="card-footer">
        <button 
          onClick={handleLike} 
          className={`like-btn ${isLiking ? 'loading' : ''}`}
          disabled={isLiking}
        >
          {isLiking ? '...' : '❤️'} {confession.likes}
        </button>
        
        {/* Debug info */}
        <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
          ID: {confession._id?.toString().substring(0, 8)}...
        </div>
      </div>
    </div>
  );
};

export default ConfessionCard;