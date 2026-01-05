export const themes = [
  { id: 'midnight', name: 'Midnight', colors: ['#667eea', '#764ba2'], emoji: '🌙' },
  { id: 'sunset', name: 'Sunset', colors: ['#ff6b6b', '#ffa726'], emoji: '🌅' },
  { id: 'ocean', name: 'Ocean', colors: ['#36d1dc', '#5b86e5'], emoji: '🌊' },
  { id: 'forest', name: 'Forest', colors: ['#38ef7d', '#11998e'], emoji: '🌳' },
  { id: 'neon', name: 'Neon', colors: ['#00ff88', '#00ccff'], emoji: '💡' },
  { id: 'royal', name: 'Royal', colors: ['#8a2be2', '#da70d6'], emoji: '👑' },
  { id: 'candy', name: 'Candy', colors: ['#ff9a9e', '#fad0c4'], emoji: '🍭' },
];

export const applyTheme = (themeId) => {
  const theme = themes.find(t => t.id === themeId) || themes[0];
  
  // Update CSS variables
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.colors[0]);
  root.style.setProperty('--theme-secondary', theme.colors[1]);
  
  // Update body class
  document.body.className = `theme-${themeId}`;
  
  // Save to localStorage
  localStorage.setItem('confession-theme', themeId);
  
  return theme;
};

export const getCurrentTheme = () => {
  return localStorage.getItem('confession-theme') || 'midnight';
};