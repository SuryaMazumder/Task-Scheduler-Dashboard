import React from 'react'
import MonthYearHeader from '../pages/MonthYear'
import HorizontalCalendar from '../pages/CalenderView'
import { useState } from 'react';


const SlidingCalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
//   const [activeTab, setActiveTab] = useState(0);



  return (
    <div className="bg-[#0f172a] text-white p-4 rounded-md shadow">
      {/* <TaskFilters active={activeTab} setActive={setActiveTab} /> */}
      
      <MonthYearHeader />
      <HorizontalCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
    </div>
  );
};


export default SlidingCalendarSection