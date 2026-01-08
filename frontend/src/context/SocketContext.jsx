import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [confessions, setConfessions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    console.log('Connecting to socket server at:', socketUrl);
    
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);
      toast.success('Connected to server', { duration: 2000 });
    });

    newSocket.on('new_confession', (confession) => {
      console.log('New confession received:', confession);
      setConfessions(prev => [confession, ...prev]);
      toast.success('New confession posted! 📝', {
        duration: 3000,
        icon: '📝',
      });
    });

    newSocket.on('update_likes', (updatedConfession) => {
      console.log('❤️ Like update received:', updatedConfession);
      
      const updatedId = updatedConfession._id?.toString();
      
      setConfessions(prev => {
        const updated = prev.map(conf => {
          const confId = conf._id?.toString();
          if (confId === updatedId) {
            console.log(`✅ Found matching confession: ${confId}`);
            return { 
              ...conf, 
              likes: updatedConfession.likes,
              reactions: updatedConfession.reactions || conf.reactions
            };
          }
          return conf;
        });
        
        const changed = JSON.stringify(prev) !== JSON.stringify(updated);
        console.log('State updated?', changed);
        
        return updated;
      });
      
      toast.success('Someone liked a confession! ❤️', {
        duration: 2000,
      });
    });

    newSocket.on('reaction_update', (updatedConfession) => {
      console.log('😄 Reaction update received:', updatedConfession);
      
      const updatedId = updatedConfession._id?.toString();
      
      setConfessions(prev =>
        prev.map(conf => {
          const confId = conf._id?.toString();
          if (confId === updatedId) {
            return { 
              ...conf, 
              reactions: updatedConfession.reactions 
            };
          }
          return conf;
        })
      );
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
      toast.error('Disconnected from server', { duration: 2000 });
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Connection error. Please check if backend is running.', {
        duration: 4000,
      });
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    newSocket.onAny((event, ...args) => {
      console.log(`📡 Socket Event [${event}]:`, args);
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection');
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    confessions,
    setConfessions,
    isConnected, 
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
      {/* Connection Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 ${
          isConnected 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`}></div>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
    </SocketContext.Provider>
  );
};