// TrendingSidebar.js
import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { FiTrendingUp, FiHeart, FiMessageCircle } from 'react-icons/fi';
import '../styles/App.css';

const TrendingSidebar = () => {
  const { confessions } = useSocket();
  const [trendingConfessions, setTrendingConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sort by likes and get top 5
    const sorted = [...confessions]
      .sort((a, b) => {
        // Sort by total engagement (likes + reactions)
        const aEngagement = a.likes + Object.values(a.reactions || {}).reduce((sum, val) => sum + val, 0);
        const bEngagement = b.likes + Object.values(b.reactions || {}).reduce((sum, val) => sum + val, 0);
        return bEngagement - aEngagement;
      })
      .slice(0, 5);

    setTrendingConfessions(sorted);
    setIsLoading(false);
  }, [confessions]);

  const getTotalReactions = (confession) => {
    if (!confession.reactions) return 0;
    return Object.values(confession.reactions).reduce((sum, val) => sum + val, 0);
  };

  if (isLoading) {
    return (
      <div className="trending-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <FiTrendingUp className="fire-icon" />
            Trending Now
          </div>
        </div>
        <div className="trending-skeleton">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-item">
              <div className="skeleton-rank"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="trending-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <FiTrendingUp className="fire-icon" />
          Trending Now
        </div>
      </div>

      {trendingConfessions.length === 0 ? (
        <div className="empty-trending">
          <div className="empty-trending-icon">🔥</div>
          <p>No trending confessions yet</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Like and react to make confessions trend!
          </p>
        </div>
      ) : (
        <div className="trending-list">
          {trendingConfessions.map((confession, index) => (
            <div key={confession._id} className="trending-item">
              <div 
                className="trending-rank" 
                data-rank={index + 1}
              >
                {index + 1}
              </div>
              <div className="trending-content">
                <p className="trending-text">
                  {confession.text.length > 100 
                    ? confession.text.substring(0, 100) + '...'
                    : confession.text
                  }
                </p>
                <div className="trending-stats">
                  <div>
                    <span className="trending-likes">
                      <FiHeart /> {confession.likes || 0}
                    </span>
                    <span style={{ marginLeft: '1rem' }}>
                      <FiMessageCircle /> {getTotalReactions(confession)}
                    </span>
                  </div>
                  <span className="category-tag">
                    {confession.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingSidebar;