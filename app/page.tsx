'use client';

import { useState } from 'react';
import DatePicker from '../components/datepicker';
import ModernDatePicker from '../components/modern-datepicker';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  return (
    <>
      <div className="flex flex-row justify-center p-10">
        <DatePicker
          onChange={handleDateChange}
          value={selectedDate}
          placeholder="Select a date"
        />
      </div>
      <div className="">
        <ModernDatePicker
          onChange={handleDateChange}
          selectedDate={selectedDate}
          formatType="MM/dd/yyyy"
        />
      </div>
    </>
  );
}
