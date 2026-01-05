import React, { useState } from 'react';
import { confessionAPI } from '../services/api';
import toast from 'react-hot-toast';
import ReactionButtons from './ReactionButtons';
import {
  FiHeart,
  FiMessageCircle,
  FiCalendar,
  FiTrendingUp,
} from 'react-icons/fi';
import '../styles/App.css';

const ConfessionCard = ({ confession }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [localLikes, setLocalLikes] = useState(confession.likes);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleLike = async () => {
    if (isLiking) return;

    setIsLiking(true);
    setLocalLikes(prev => prev + 1);

    try {
      await confessionAPI.like(confession._id);
    } catch (error) {
      setLocalLikes(prev => prev - 1);
      toast.error('Failed to like confession');
    } finally {
      setIsLiking(false);
    }
  };

  const categoryColors = {
    'General': '#667eea',
    'Love': '#f56565',
    'College': '#48bb78',
    'Career': '#ed8936',
    'Family': '#9f7aea',
    'Mental Health': '#4299e1',
  };

  return (
    <div className="confession-card">
      <div className="card-header">
        <div className="category-badge" style={{ backgroundColor: categoryColors[confession.category] }}>
          {confession.category}
        </div>
        <div className="timestamp">
          <FiCalendar /> {formatDate(confession.createdAt)}
        </div>
      </div>

      <div className="confession-text">
        <p>{confession.text}</p>
      </div>

      <div className="card-footer">
        <div className="interactions">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`like-btn ${isLiking ? 'liking' : ''}`}
          >
            <FiHeart className={isLiking ? 'heart-animate' : ''} />
            <span>{localLikes}</span>
          </button>

          <div className="trending-indicator">
            {confession.likes >= 10 && (
              <span className="trending-badge">
                <FiTrendingUp /> Trending
              </span>
            )}
          </div>
        </div>

        <ReactionButtons confessionId={confession._id} initialReactions={confession.reactions} />
      </div>
    </div>
  );
};

export default ConfessionCard;