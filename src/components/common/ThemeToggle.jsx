import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        padding: '8px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-primary)'
      }}
    >
      {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#0284c7' }} />}
    </button>
  );
};
