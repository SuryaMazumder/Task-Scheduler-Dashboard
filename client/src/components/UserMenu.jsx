import React, { useState } from 'react';
import jwt_decode from "jwt-decode";

const UserMenu = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem('token');
  let user = {};

  if (token) {
    const decoded = jwt_decode(token);
    // Example: decoded = { id, email, name, ... }
    user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name
    };
  }

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold"
      >
        {firstLetter}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-zinc-900 text-white rounded shadow-xl z-50 p-4">
          {/* Top User Info */}
          <div className="mb-3">
            <div className="text-sm font-semibold">{user.email}</div>
            <div className="text-xs text-gray-400">{user.name}</div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-2" />

          {/* Documentation */}
          <div className="text-xs font-semibold mb-1 text-gray-400">Documentation</div>
          <div className="bg-zinc-800 rounded p-3 mb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold flex items-center gap-1">
                  📅 Google Calendar
                </p>
                <p className="text-xs text-gray-400">Connect your Google Calendar to sync events with your tasks</p>
              </div>
              <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">Connected</button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 mt-2 text-sm hover:text-red-500"
          >
            🔌 Log out
          </button>

          {/* Bottom Task Count */}
          <div className="text-xs text-gray-400 mt-3 border-t border-gray-700 pt-2">
            1 task
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
