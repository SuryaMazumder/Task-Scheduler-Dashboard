import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PendingTask from "./PendingTask";

const HourlyTaskShow = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const formattedDate = selectedDate.toISOString().split("T")[0];


  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/tasks/timetask/?date=${formattedDate}`,{
             headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTasks(res.data || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [formattedDate]);

  const handleHourClick = (hour) => {
    const time = hour.toString().padStart(2, "0") + ":00";
    navigate(`/create-task?time=${time}&date=${formattedDate}`);
  };

  const isOverdue = tasks.some(
    (task) => new Date(task.endTime) < new Date() && task.status !== "completed"
  );

  const renderTaskForHour = (hour) => {
    return tasks
      .filter((task) => new Date(task.startTime).getHours() === hour)
      .map((task, i) => (
        <div
          key={i}
          className="bg-blue-100 dark:bg-zinc-700 p-2 rounded text-sm mb-1"
        >
          <div className="font-semibold">{task.title}</div>
          <div className="text-xs">ENDTIME: {task.endTime.slice(11, 16)}</div>
        </div>
      ));
  };

  return (
    <div className="bg-zinc-900 text-white p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">
        Day Schedule - {selectedDate.toDateString()}
      </h2>

      {isOverdue && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex justify-between items-center">
          <div>
            <strong>⚠ My Overdue Tasks</strong>
            <div>Some major tasks need your attention</div>
          </div>
          <button className="bg-red-500 text-white px-3 py-1 rounded">
           <PendingTask selectedDate={selectedDate} />
          </button>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">Hourly Schedule</span>
          <span className="text-xs text-gray-400">
            {tasks.length} scheduled
          </span>
        </div>
        {Array.from({ length: 24 }, (_, hour) => (
          <div
            key={hour}
            className="border border-gray-500 rounded p-2 mb-2 hover:bg-zinc-800 cursor-pointer"
            onClick={() => handleHourClick(hour)}
          >
            <div className="font-mono text-xs text-gray-400 mb-1">
              {hour.toString().padStart(2, "0")}:00
            </div>
            {renderTaskForHour(hour)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyTaskShow;
