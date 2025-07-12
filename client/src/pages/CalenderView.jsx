import React, { useState,useRef ,useEffect} from 'react';
const HorizontalCalendar = ({ selectedDate, onSelectDate }) => {
  const containerRef = useRef();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 5 + i);
    return d;
  });

  useEffect(() => {
    const index = days.findIndex(d => d.toDateString() === selectedDate.toDateString());
    if (containerRef.current && index !== -1) {
      const el = containerRef.current.children[index];
      el?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [selectedDate]);

  return (
    <div className="overflow-x-auto scrollbar-thin" ref={containerRef}>
      <div className="flex gap-4 min-w-max">
        {days.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateNum = date.getDate();

          return (
            <div
              key={index}
              className={`min-w-[48px] text-center py-2 px-2 rounded-md ${
                isSelected ? "bg-red-600 text-white" : "text-white"
              } cursor-pointer`}
              onClick={() => onSelectDate(date)}
            >
              <div className="text-sm">{day[0]}</div>
              <div className="text-lg font-bold">{dateNum}</div>
              <div className="flex justify-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default HorizontalCalendar;