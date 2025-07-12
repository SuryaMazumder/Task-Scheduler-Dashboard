import React, { useState } from 'react';
import axios from 'axios';

const PendingTask = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const formattedDate = selectedDate.toISOString().split("T")[0];

  const handleViewAll = async () => {
    try {
      const res = await axios.get(`/api/tasks/timetask/?date=${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(res.data); // Make sure your backend returns an array of tasks
      setShowAll(true);
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error);
    }
  };
  const handleClose = () => {
    setShowAll(false);
    setTasks([]);
  };


return (
    <div className="bg-zinc-900 text-white p-4 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-red-400">
          🕒 My Overdue Tasks {showAll ? `(${tasks.length})` : ""}
        </h2>

        <div className="flex gap-2">
          {showAll ? (
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              ❌ Close
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleViewAll}
            >
              View All
            </button>
          )}
        </div>
      </div>

      {/* Task Display */}
      {showAll ? (
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 mt-4">
              ✅ No tasks pending.
            </div>
          ) : (
            tasks.map(task => (
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
                  <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                    Due:{" "}
                    {new Date(task.startTime).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                  <span className="bg-gray-700 text-white text-xs px-2 py-0.5 rounded">
                    {new Date(task.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                    End:{" "}
                    {new Date(task.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
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
            ))
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 italic mt-2">
          Click "View All" to load your overdue tasks.
        </div>
      )}
    </div>
  );
};

export default PendingTask;