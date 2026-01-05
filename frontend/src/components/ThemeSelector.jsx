import React, { useState } from 'react';
import { FiPalette, FiCheck } from 'react-icons/fi';

const themes = [
  { id: 'midnight', name: 'Midnight', colors: ['#667eea', '#764ba2'], emoji: '🌙' },
  { id: 'sunset', name: 'Sunset', colors: ['#ff6b6b', '#ffa726'], emoji: '🌅' },
  { id: 'ocean', name: 'Ocean', colors: ['#36d1dc', '#5b86e5'], emoji: '🌊' },
  { id: 'forest', name: 'Forest', colors: ['#38ef7d', '#11998e'], emoji: '🌳' },
  { id: 'neon', name: 'Neon', colors: ['#00ff88', '#00ccff'], emoji: '💡' },
  { id: 'royal', name: 'Royal', colors: ['#8a2be2', '#da70d6'], emoji: '👑' },
  { id: 'candy', name: 'Candy', colors: ['#ff9a9e', '#fad0c4'], emoji: '🍭' },
];

const ThemeSelector = ({ currentTheme, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-all"
      >
        <FiPalette />
        <span>Theme</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass rounded-2xl p-4 z-50 animate-slideInUp">
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onChange(theme.id);
                  setIsOpen(false);
                }}
                className="relative p-3 rounded-xl transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{theme.emoji}</div>
                  <div className="text-sm font-semibold text-white">{theme.name}</div>
                </div>
                {currentTheme === theme.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <FiCheck className="text-black text-xs" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;