import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const repeatOptions = [
  { label: "Does not repeat", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" }
];

// registeredUsers should be array of objects: { _id, email }
const registeredUsers = [
  { _id: "68723f3e822858efe359b872", email: "user1@email.com" },
  // ...
];

const colors = [
  { name: "Blue", value: "blue", dot: "bg-blue-600" },
  { name: "Yellow", value: "yellow", dot: "bg-yellow-400" },
  { name: "Red", value: "red", dot: "bg-red-600" },
  { name: "Cyan", value: "cyan", dot: "bg-cyan-400" },
  { name: "Green", value: "green", dot: "bg-green-600" }
];

const types = ["Task", "Meeting"];

const remindersList = [
  { label: "5 minutes before", value: 5 },
  { label: "15 minutes before", value: 15 },
  { label: "30 minutes before", value: 30 },
  { label: "1 hour before", value: 60 },
  { label: "1 day before", value: 1440 }
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidObjectId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

const getNextHalfHour = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + (30 - (now.getMinutes() % 30)));
  return now.toTimeString().slice(0, 5);
};

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Task');
  const [color, setColor] = useState('blue');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState(getNextHalfHour());
  const [endTime, setEndTime] = useState(getNextHalfHour());
  const [repeat, setRepeat] = useState(repeatOptions[0]);
  const [reminders, setReminders] = useState([]);
  const [assignPerson, setAssignPerson] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualEmailValid, setManualEmailValid] = useState(true);

  const navigate = useNavigate();

  const handleReminderChange = (value) => {
    setReminders(reminders.includes(value)
      ? reminders.filter(r => r !== value)
      : [...reminders, value]);
  };

  const handleManualEmailChange = (e) => {
    setManualEmail(e.target.value);
    setManualEmailValid(isValidEmail(e.target.value) || e.target.value === "");
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !startTime || !endTime) {
      alert("Title, start time, and end time are required.");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    if (end <= start) {
      alert("End time must be after start time");
      return;
    }
    if (end < new Date()) {
      alert("End time cannot be in the past");
      return;
    }

    let assignedTo = "";
    if (selectedUser) {
      assignedTo = selectedUser; // should be user ID
      if (!isValidObjectId(assignedTo)) {
        alert("Assigned user is invalid.");
        return;
      }
    }

    const payload = {
      title,
      company,
      type,
      color,
      notes,
      assignedTo: assignedTo || undefined,
      startTime: start,
      endTime: end,
      repeat: repeat.value, // must be lowercase value from repeatOptions
      reminders
    };

    try {
      await axios.post('/api/tasks/createTask', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Event Created!');
      navigate('/account');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full mx-auto mt-8 bg-white shadow-lg p-10 rounded text-black"
      style={{ border: "1px solid #e5e7eb", background: "#f8fafc" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Create New Event</h2>
        <button
          type="button"
          onClick={() => navigate('/account')}
          className="text-gray-500 hover:text-red-600 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="col-span-2 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Current Date and Time</h3>
          <p className="text-gray-700">{new Date().toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold text-gray-700">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">Start Time</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            min={startTime}
            className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white"
          />

          <label className="font-semibold text-gray-700">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title" className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">Company (Optional)</label>
          <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Enter company name" className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white">
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <label className="font-semibold text-gray-700">Color</label>
          <select value={color} onChange={e => setColor(e.target.value)} className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white">
            {colors.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
          </select>
          <div className="flex gap-2 mb-2">
            {colors.map(c => (
              <span key={c.value} className={`w-5 h-5 rounded-full border ${c.dot}`}></span>
            ))}
          </div>
        </div>
        <div>
          <label className="font-semibold text-gray-700">Notes (Optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Enter additional notes" className="block mb-4 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">Assign to One Person</label>
          <input type="text" value={assignPerson} onChange={e => setAssignPerson(e.target.value)} placeholder="Type name" className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white" />

          <label className="font-semibold text-gray-700">Select a registered user</label>
          <div className="flex items-center gap-2 mb-2">
            <select
              value={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
              className="w-full border border-gray-400 p-2 text-gray-900 bg-white"
            >
              <option value="">Select user</option>
              {registeredUsers.map(user => (
                <option key={user._id} value={user._id}>{user.email}</option>
              ))}
            </select>
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap">Add</button>
          </div>

          <label className="font-semibold text-gray-700">Add email manually</label>
          <input
            type="text"
            value={manualEmail}
            onChange={handleManualEmailChange}
            placeholder="Enter email"
            className={`block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white ${manualEmail && !manualEmailValid ? 'border-red-500' : ''}`}
          />
          {!manualEmailValid && (
            <span className="text-red-500 text-sm mb-2 block">Please enter a valid email address.</span>
          )}

          <label className="font-semibold text-gray-700">Repeat</label>
          <select
            value={repeat}
            onChange={e => setRepeat(e.target.value)}
            className="block mb-2 w-full border border-gray-400 p-2 text-gray-900 bg-white"
          >
            {repeatOptions.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>

          <div className="mb-2">
            <div className="font-semibold text-gray-700 mb-2">Reminders</div>
            {remindersList.map(rem => (
              <label key={rem.value} className="flex items-center mb-1 text-gray-700">
                <input
                  type="checkbox"
                  checked={reminders.includes(rem.value)}
                  onChange={() => handleReminderChange(rem.value)}
                  className="mr-2"
                />
                {rem.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" className="bg-gray-400 text-white px-6 py-2 rounded">Cancel</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create Event</button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
