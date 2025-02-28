'use client'

import React, { useState, useEffect, useRef } from 'react';

interface DatePickerProps {
  onChange: (date: Date | null) => void;
  value?: Date | null;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, value, placeholder = 'Select Date' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(value || null); // Sync selectedDate with the prop value
  }, [value]);


  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange(null);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const generateCalendar = () => {
    if (!isOpen) return null;

    const today = new Date();
    const currentDate = selectedDate || today;
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

    const calendar = [];
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) { // Max 6 weeks
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(<td key={`${i}-${j}`} className="p-2"></td>); // Empty cells before the first day
        } else if (dayCounter > daysInMonth) {
          break; // Stop when all days are rendered
        } else {
          const date = new Date(currentYear, currentMonth, dayCounter);
          const isSelected = selectedDate && date.getTime() === selectedDate.getTime();
          const isToday = date.toDateString() === today.toDateString();
          week.push(
            <td
              key={`${i}-${j}`}
              className={`p-2 cursor-pointer ${isSelected ? 'bg-blue-500 text-white rounded-md' : ''} ${isToday ? 'font-bold' : ''} hover:bg-gray-200`}
              onClick={() => handleDateClick(date)}
            >
              {dayCounter}
            </td>
          );
          dayCounter++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }

    return (
      <div className="bg-white border rounded-md shadow-md absolute z-10 mt-2" ref={calendarRef}>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="p-2">Sun</th>
              <th className="p-2">Mon</th>
              <th className="p-2">Tue</th>
              <th className="p-2">Wed</th>
              <th className="p-2">Thu</th>
              <th className="p-2">Fri</th>
              <th className="p-2">Sat</th>
            </tr>
          </thead>
          <tbody>{calendar}</tbody>
        </table>
      </div>
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(); // Customize date format as needed
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="border rounded-md px-3 py-2 w-full cursor-pointer"
        value={formatDate(selectedDate)}
        placeholder={placeholder}
        onClick={handleInputClick}
        readOnly // Prevent direct input
      />
      {selectedDate && (
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={handleClear}>
          &times; {/* Clear icon */}
        </button>
      )}
      {generateCalendar()}
    </div>
  );
};

export default DatePicker;