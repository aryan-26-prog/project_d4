import React, { useEffect, useState } from 'react';
import { confessionAPI } from '../services/api';
import { 
  FiTrendingUp, 
  FiHeart, 
  FiMessageCircle, 
  FiCalendar,
  FiRefreshCw,
  FiInbox,
  FiClock,
  FiAward
} from 'react-icons/fi';
import { FaFire, FaChartLine } from 'react-icons/fa';

const TrendingSidebar = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrending();
    const interval = setInterval(fetchTrending, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrending = async () => {
    try {
      const response = await confessionAPI.getTrending();
      setTrending(response.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch trending:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="trending-sidebar">
        <div className="sidebar-header">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaFire className="text-orange-500" />
            Trending Now
          </h3>
        </div>
        <div className="flex justify-center py-8">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-sidebar">
      <div className="sidebar-header">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaFire className="text-orange-500" />
          Trending Now
        </h3>
      </div>
      
      <div className="space-y-4">
        {trending.map((confession, index) => (
          <div 
            key={confession._id} 
            className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
                  index === 2 ? 'bg-gradient-to-r from-amber-700 to-amber-900' :
                  'bg-gradient-to-r from-purple-600 to-pink-600'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm line-clamp-2 mb-2">
                  {confession.text}
                </p>
                
                <div className="flex items-center justify-between text-xs text-white/60">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <FiHeart className="text-red-400" />
                      {confession.likes}
                    </span>
                    
                    <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
                      {confession.category}
                    </span>
                  </div>
                  
                  {confession.likes >= 10 && (
                    <span className="flex items-center gap-1 text-orange-400">
                      <FaChartLine />
                      Hot
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {trending.length === 0 && (
        <div className="empty-state py-8">
          <div className="text-center">
            <FiInbox className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60">No trending confessions yet</p>
            <p className="text-white/40 text-sm mt-1">Be the first to get popular!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingSidebar;