import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import SlidingCalendarSection from '../components/UpperCalenderTask';
import TaskFilter from '../components/TaskFilter';
import axios from 'axios';
import HourlyTaskShow from '../components/HourlyTaskShow';
import ListTaskViews from '../components/ListTaskViews';

const Account = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [active, setActive] = useState(0);
  const [taskCounts, setTaskCounts] = useState([0, 0, 0]);
  const [viewMode, setViewMode] = useState('day');
  const navigate = useNavigate();

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get('/api/tasks/taskSummary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = res.data;
        const countsArray = [
          data.myTasks ?? 0,
          data.delegatedTasks ?? 0,
          data.meetings ?? 0
        ];
        setTaskCounts(countsArray);
      } catch (err) {
        console.error('Error fetching task counts:', err);
      }
    };

    fetchCounts();
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  if (!token) return <div className="text-center mt-10">Redirecting...</div>;

  return (
    <>
      <Header
        onTodayClick={handleTodayClick}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <TaskFilter active={active} setActive={setActive} counts={taskCounts} />

      {viewMode === 'list' ? (
        <ListTaskViews selectedDate={selectedDate} />
      ) : (
        <>
          <SlidingCalendarSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <HourlyTaskShow selectedDate={selectedDate} />
        </>
      )}
    </>
  );
};

export default Account;
