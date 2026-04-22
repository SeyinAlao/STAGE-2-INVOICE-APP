import React, { useState, useRef, useEffect } from 'react';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import { InvoiceStatus } from '../../types';

export const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { filterStatuses, toggleFilter } = useInvoiceStore();

  const statuses: InvoiceStatus[] = ['draft', 'pending', 'paid'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 font-spartan text-[15px] font-bold text-dark transition-colors hover:text-gray-blueish dark:text-white"
      >
        <span className="hidden md:inline">Filter by status</span>
        <span className="md:hidden">Filter</span>
        <svg 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          width="11" height="7" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 mt-6 w-48 -translate-x-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-[#252945] z-50">
          <div className="flex flex-col gap-4">
            {statuses.map((status) => {
              const isChecked = filterStatuses.includes(status);
              return (
                <label 
                  key={status} 
                  className="group flex cursor-pointer items-center gap-3"
                  onClick={() => toggleFilter(status)}
                >
                  <div className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                    isChecked 
                      ? 'border-primary bg-primary' 
                      : 'border-transparent bg-[#DFE3FA] group-hover:border-primary dark:bg-navy-dark'
                  }`}>
                    {isChecked && (
                      <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <span className="font-spartan text-[15px] font-bold capitalize text-dark dark:text-white">
                    {status}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};