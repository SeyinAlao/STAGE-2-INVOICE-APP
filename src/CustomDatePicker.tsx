import React, { useState } from 'react';
import CalendarIcon from '../src/assets/Shape.svg';
export const CustomDatePicker = ({ label, value, onChange, error, className = '' }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());

  const displayDate = value 
    ? new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) 
    : '';

  const handleDayClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    onChange(`${year}-${month}-${formattedDay}`);
    setIsOpen(false);
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className={`relative flex flex-col ${className}`}>
      <label className={`mb-2 font-spartan text-xs font-medium ${error ? 'text-[#EC5757]' : 'text-gray-blueish dark:text-gray-border'}`}>
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex h-12 w-full items-center justify-between cursor-pointer rounded border bg-white px-4 font-spartan text-base font-bold text-gray-950 outline-none transition-colors hover:border-[#9277FF] dark:bg-navy-dark dark:text-white dark:hover:border-[#9277FF] ${
          error ? 'border-[#EC5757]' : 'border-[#DFE3FA] dark:border-[#252945]'
        }`}
      >
        <span>{displayDate}</span>
        <img src={CalendarIcon} alt="calendar" className="pointer-events-none h-4 w-4" />
      </div>

      {isOpen && (
        <div className="absolute top-[80px] z-[60] w-full rounded-lg bg-white p-6 shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          <div className="mb-6 flex items-center justify-between font-spartan text-base font-bold text-gray-950 dark:text-white">
            <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 hover:text-[#9277FF]">
              &lt;
            </button>
            <span>{currentMonth.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 hover:text-[#9277FF]">
              &gt;
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-4 text-center font-spartan text-[15px] font-bold text-gray-950 dark:text-white">
            {daysArray.map((day) => (
              <div key={day} onClick={() => handleDayClick(day)} className="cursor-pointer transition-colors hover:text-[#9277FF]">
                {day}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};