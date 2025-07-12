import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onTodayClick, viewMode, setViewMode }) => {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();



 useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    setIsDark(true);
  } else {
    document.documentElement.classList.remove('dark');
    setIsDark(false);
  }
}, []);
const toggleTheme = () => {
  const newIsDark = !isDark;
  setIsDark(newIsDark);
  if (newIsDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-black dark:bg-zinc-900 text-white shadow-md">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-1 border border-blue-500 text-blue-400 rounded"
          onClick={onTodayClick}
        >
          Today
        </button>

        <button onClick={toggleTheme} className="text-xl">
          {isDark ? '🌙' : '☀️'}
        </button>

        <div className="ml-4 bg-zinc-800 rounded-md flex">
          <button
            onClick={() => setViewMode('day')}
            className={`px-4 py-1 rounded-l-md ${
              viewMode === 'day' ? 'bg-zinc-700 text-white' : 'text-gray-400'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-1 rounded-r-md ${
              viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-gray-400'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="relative flex items-center gap-4">
        <button
          onClick={() => navigate('/create-task')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-lg"
        >
          ➕
        </button>

        <div
          className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>

        {showMenu && (
          <div className="absolute right-0 top-12 bg-white dark:bg-zinc-800 shadow-md rounded p-4 w-64 z-50 text-black dark:text-white">
            <div className="font-semibold">{user?.email}</div>
            <div className="text-sm mb-2 text-gray-400">{user?.name}</div>

            <div className="border-t border-gray-300 my-2"></div>

            <button
              onClick={() => navigate('/documentation')}
              className="w-full text-left py-1 hover:underline"
            >
              Documentation
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left py-1 text-red-500 hover:underline"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
