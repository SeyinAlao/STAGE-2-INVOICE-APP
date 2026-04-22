import React, { useState } from 'react';

export const CustomSelect = ({ label, value, onChange, options, error, className = '' }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((o: any) => o.value === String(value))?.label || '';

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
        <span>{selectedLabel}</span>
        <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-[80px] z-[60] w-full rounded-lg bg-white shadow-[0_10px_20px_rgba(72,84,159,0.25)] dark:bg-[#252945] dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          {options.map((opt: any, index: number) => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`cursor-pointer px-6 py-4 font-spartan text-base font-bold text-gray-950 transition-colors hover:text-[#9277FF] dark:text-white dark:hover:text-[#9277FF] ${
                index !== options.length - 1 ? 'border-b border-[#DFE3FA] dark:border-[#1E2139]' : ''
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};