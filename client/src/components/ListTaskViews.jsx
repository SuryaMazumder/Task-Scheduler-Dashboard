import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListTaskViews = () => {
  const [tasks, setTasks] = useState([]);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const res = await axios.get(`/api/tasks/timetask/?date=${formattedDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching today\'s tasks:', error);
      }
    };

    fetchTodayTasks();
  }, [formattedDate]);

  return (
    <div className="bg-zinc-900 text-white p-4 rounded-md">
      <h2 className="text-lg font-semibold text-blue-400 mb-4">
        📋 Today’s Tasks ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 mt-4">✅ No tasks for today.</div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-blue-100 dark:bg-zinc-800 text-black dark:text-white p-4 rounded-md shadow"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <button className="text-xs hover:underline">✏️</button>
              </div>
              <p className="text-sm">{task.description}</p>

              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded">
                  {formattedDate}
                </span>
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                  {new Date(task.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                  End: {new Date(task.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="mt-2">
                <select className="bg-gray-800 text-white px-2 py-1 rounded">
                  <option>No Action</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTaskViews;
