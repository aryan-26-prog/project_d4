import React, { useEffect, useState } from 'react';
import { confessionAPI } from '../services/api';
import { 
  FiHeart, 
  FiFrown, 
  FiSmile, 
  FiMeh,
  FiZap,
  FiThumbsUp 
} from 'react-icons/fi';

const ConfessionCard = ({ confession: initialConfession, socket }) => {
  const [confession, setConfession] = useState(initialConfession);
  const [isLiking, setIsLiking] = useState(false);
  const [isReacting, setIsReacting] = useState('');

  // Listen for updates directly in card
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (updatedConfession) => {
      const updatedId = updatedConfession._id?.toString();
      const confId = confession._id?.toString();
      
      if (updatedId === confId) {
        console.log('ConfessionCard: Updating', confId);
        setConfession(prev => ({
          ...prev,
          likes: updatedConfession.likes || prev.likes,
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

  const handleReaction = async (type) => {
    if (isReacting) return;
    
    try {
      setIsReacting(type);
      await confessionAPI.react(confession._id, type);
      
      // Optimistic update
      setConfession(prev => ({
        ...prev,
        reactions: {
          ...prev.reactions,
          [type]: (prev.reactions[type] || 0) + 1
        }
      }));
    } catch (error) {
      console.error('Reaction error:', error);
    } finally {
      setIsReacting('');
    }
  };

  // Ensure reactions object exists
  const reactions = confession.reactions || {
    shock: 0,
    laugh: 0,
    sad: 0,
    wow: 0
  };

  const reactionIcons = {
    shock: { icon: <FiZap />, label: 'Shock', color: '#FF6B35' },
    laugh: { icon: <FiSmile />, label: 'Laugh', color: '#FFD166' },
    sad: { icon: <FiFrown />, label: 'Sad', color: '#118AB2' },
    wow: { icon: <FiMeh />, label: 'Wow', color: '#EF476F' }
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
        {/* Like Button */}
        <button 
          onClick={handleLike} 
          className={`like-btn ${isLiking ? 'loading' : ''}`}
          disabled={isLiking}
        >
          <FiHeart className={confession.likes > 0 ? 'liked' : ''} />
          <span>{confession.likes || 0}</span>
        </button>
        
        {/* Reactions */}
        <div className="reactions-container">
          <div className="reactions-label">Reactions:</div>
          <div className="reactions-buttons">
            {Object.entries(reactionIcons).map(([type, { icon, label, color }]) => (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                className={`reaction-btn ${isReacting === type ? 'active' : ''}`}
                disabled={isReacting}
                style={{ '--reaction-color': color }}
                title={label}
              >
                {icon}
                <span className="reaction-count">{reactions[type] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionCard;