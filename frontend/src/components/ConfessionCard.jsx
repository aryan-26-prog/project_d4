import React, { useEffect, useState } from 'react';
import { confessionAPI } from '../services/api';
import { 
  FiHeart, 
  FiFrown, 
  FiSmile, 
  FiMeh,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';

const ConfessionCard = ({ confession: initialConfession, socket }) => {
  const [confession, setConfession] = useState(initialConfession);
  const [isLiking, setIsLiking] = useState(false);
  const [isReacting, setIsReacting] = useState('');
  const [isTrending, setIsTrending] = useState(false);

  // Category color mapping
  const categoryColors = {
    'GENERAL': '#4299e1',
    'LOVE': '#ed64a6',
    'COLLEGE': '#38b2ac',
    'CAREER': '#ed8936',
    'FAMILY': '#9f7aea',
    'MENTAL HEALTH': '#f56565'
  };

  // Check if confession is trending
  useEffect(() => {
    const checkTrending = () => {
      const totalInteractions = 
        (confession.likes || 0) + 
        (confession.reactions ? 
          Object.values(confession.reactions).reduce((a, b) => a + b, 0) : 0);
      
      // Trending if likes > 50 OR total interactions > 100
      setIsTrending((confession.likes || 0) > 50 || totalInteractions > 100);
    };

    checkTrending();
  }, [confession]);

  // Listen for updates
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (updatedConfession) => {
      const updatedId = updatedConfession._id?.toString();
      const confId = confession._id?.toString();
      
      if (updatedId === confId) {
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

  useEffect(() => {
    setConfession(initialConfession);
  }, [initialConfession]);

  const handleLike = async () => {
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      await confessionAPI.like(confession._id);
      
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

  const reactionIcons = [
    { type: 'shock', icon: <FiZap />, label: 'Shock', color: '#FF6B35' },
    { type: 'laugh', icon: <FiSmile />, label: 'Laugh', color: '#FFD166' },
    { type: 'sad', icon: <FiFrown />, label: 'Sad', color: '#118AB2' },
    { type: 'wow', icon: <FiMeh />, label: 'Wow', color: '#EF476F' }
  ];

  const categoryColor = categoryColors[confession.category] || '#4299e1';

  return (
    <div className="confession-card">
      <div className="card-header">
        {/* Category badge with color */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span 
            className="category-badge"
            data-category={confession.category}
            style={{ 
              backgroundColor: categoryColor,
              color: 'white'
            }}
          >
            {confession.category}
          </span>
          
          {/* Trending badge - shown in header */}
          {isTrending && (
            <div className="trending-badge">
              <FiTrendingUp style={{ fontSize: '14px' }} />
              <span>Trending</span>
            </div>
          )}
        </div>
        
        <span className="timestamp">
          {new Date(confession.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <p className="confession-text">{confession.text}</p>
      
      <div className="card-footer">
        <div className="interactions">
          {/* Like Button */}
          <button 
            onClick={handleLike} 
            className={`like-btn ${isLiking ? 'liking' : ''}`}
            disabled={isLiking}
          >
            <FiHeart className="heart-icon" />
            <span>{confession.likes || 0}</span>
          </button>
          
          {/* Reactions */}
          <div className="reaction-buttons">
            {reactionIcons.map(({ type, icon, label, color }) => (
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

      <style>{`
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        
        .interactions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }
        
        .like-btn {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          min-width: 80px;
        }
        
        .reaction-buttons {
          display: flex;
          gap: 0.5rem;
          margin-left: auto;
        }
        
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .category-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
        }
        
        .trending-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          background: linear-gradient(135deg, #f56565 0%, #ed8936 100%);
          border-radius: 12px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ConfessionCard;