'use client'

import React, { useState, useRef, useEffect } from 'react';
import { format, isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isBefore, isAfter, isValid, parse } from 'date-fns';

interface DatePickerProps {
  onChange: (date: Date | null) => void;
  selectedDate?: Date | null;
  formatType?: string; // e.g., 'yyyy-MM-dd', 'MM/dd/yyyy'
}

const ModernDatePicker: React.FC<DatePickerProps> = ({ onChange, selectedDate, formatType = 'yyyy-MM-dd' }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? startOfMonth(selectedDate) : startOfMonth(new Date()));
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close the calendar if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleDateClick = (day: Date) => {
    onChange(day);
    setIsOpen(false); // Close after selection
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      days.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return format(date, formatType || 'yyyy-MM-dd'); // Use provided format or default
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32" // Adjust width as needed
        value={formatDate(selectedDate)}
        onClick={() => setIsOpen(!isOpen)}
        readOnly // Prevent direct input
      />

      {isOpen && (
        <div ref={calendarRef} className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-1">
          <div className="flex justify-between items-center px-4 py-2">
            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-medium">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={handleNextMonth} className="text-gray-600 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 px-2 py-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-gray-500 font-medium text-sm">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((day) => (
              <div
                key={day.toISOString()}
                className={`text-center py-1 rounded-md cursor-pointer hover:bg-gray-100 ${
                  isSameDay(day, selectedDate || new Date()) ? 'bg-blue-500 text-white' : ''
                } ${!isSameMonth(day, currentMonth) ? 'text-gray-400' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDatePicker;