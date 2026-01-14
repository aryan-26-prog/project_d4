import React, { useState } from 'react';
import { confessionAPI } from '../services/api';
import toast from 'react-hot-toast';
import {
  FiZap,        // Shock icon
  FiSmile,      // Laugh icon
  FiFrown,      // Sad icon
  FiMeh         // Wow icon
} from 'react-icons/fi';
import '../styles/App.css';

const ReactionButtons = ({ confessionId, initialReactions }) => {
  const [reactions, setReactions] = useState(initialReactions || {
    shock: 0,
    laugh: 0,
    sad: 0,
    wow: 0
  });
  
  const [activeReaction, setActiveReaction] = useState(null);
  const [userReactions, setUserReactions] = useState({}); // It is used to Track user's reactions

  // Only 4 reaction types with shock replacing heart
  const reactionTypes = [
    { 
      type: 'shock', 
      label: 'Shock', 
      icon: <FiZap />, 
      color: '#FFD700', 
      emoji: '⚡'
    },
    { 
      type: 'laugh', 
      label: 'Laugh', 
      icon: <FiSmile />, 
      color: '#ed8936', 
      emoji: '😂'
    },
    { 
      type: 'sad', 
      label: 'Sad', 
      icon: <FiFrown />, 
      color: '#4299e1', 
      emoji: '😢'
    },
    { 
      type: 'wow', 
      label: 'Wow', 
      icon: <FiMeh />, 
      color: '#9f7aea', 
      emoji: '😲'
    }
  ];

  const handleReaction = async (type) => {
    // If user already reacted with this type, then remove it
    if (userReactions[type]) {
      setReactions(prev => ({
        ...prev,
        [type]: Math.max(0, (prev[type] || 0) - 1)
      }));
      
      setUserReactions(prev => {
        const newReactions = { ...prev };
        delete newReactions[type];
        return newReactions;
      });
      
      setActiveReaction(type);
      
      try {
        // Call API to remove reaction
        await confessionAPI.react(confessionId, type);
        toast.success(`Removed ${type} reaction`);
      } catch (error) {
        // Rollback on error
        setReactions(prev => ({
          ...prev,
          [type]: (prev[type] || 0) + 1
        }));
        setUserReactions(prev => ({ ...prev, [type]: true }));
        toast.error('Failed to remove reaction');
      } finally {
        setTimeout(() => setActiveReaction(null), 300);
      }
      return;
    }

    // Remove any previous reaction (only allow one reaction at a time)
    const previousReaction = Object.keys(userReactions)[0];
    if (previousReaction) {
      setReactions(prev => ({
        ...prev,
        [previousReaction]: Math.max(0, (prev[previousReaction] || 0) - 1)
      }));
      setUserReactions({});
    }

    // Add new reaction
    setReactions(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
    
    setUserReactions({ [type]: true });
    setActiveReaction(type);

    try {
      await confessionAPI.react(confessionId, type);
      
      // Show different toast messages for different reactions
      const reactionMessages = {
        shock: '⚡ Shocked!',
        laugh: '😂 That\'s funny!',
        sad: '😢 Feeling sad',
        wow: '😲 Wow!'
      };
      
      toast.success(reactionMessages[type] || 'Reaction added!', {
        duration: 2000,
        icon: reactionTypes.find(r => r.type === type)?.emoji || '👍'
      });
    } catch (error) {
      // Rollback on error
      setReactions(prev => ({
        ...prev,
        [type]: Math.max(0, (prev[type] || 0) - 1)
      }));
      
      // Restore previous reaction if any
      if (previousReaction) {
        setReactions(prev => ({
          ...prev,
          [previousReaction]: (prev[previousReaction] || 0) + 1
        }));
        setUserReactions({ [previousReaction]: true });
      }
      
      const errorMsg = error.response?.data?.error || 'Failed to add reaction';
      toast.error(errorMsg, {
        duration: 3000,
        icon: '❌'
      });
    } finally {
      setTimeout(() => setActiveReaction(null), 300);
    }
  };

  return (
    <div className="reaction-buttons-container">
      <div className="reaction-buttons">
        {reactionTypes.map(({ type, label, icon, color }) => (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className={`reaction-btn ${userReactions[type] ? 'active' : ''} ${activeReaction === type ? 'reacting' : ''}`}
            style={{ 
              '--reaction-color': color,
              '--reaction-glow': `${color}40`
            }}
            title={label}
            aria-label={`React with ${label}`}
          >
            <div className="reaction-icon">
              {icon}
              {userReactions[type] && (
                <span className="reaction-emoji">
                  {type === 'shock' ? '⚡' : 
                   type === 'laugh' ? '😂' : 
                   type === 'sad' ? '😢' : '😲'}
                </span>
              )}
            </div>
            <span className="reaction-count">{reactions[type] || 0}</span>
            {activeReaction === type && (
              <span className="reaction-sparkle"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactionButtons;