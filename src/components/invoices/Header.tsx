import React from 'react';
import { FilterDropdown } from './FilterDropdown'; 
import { useInvoiceStore } from '../../store/useInvoiceStore';

interface HeaderProps {
  onNewInvoice: () => void;
}

export const Header = ({ onNewInvoice }: HeaderProps) => {
  const { invoices, filterStatuses } = useInvoiceStore();

  const filteredInvoices = filterStatuses.length > 0 
    ? invoices.filter(inv => filterStatuses.includes(inv.status))
    : invoices;

  return (
    <header className="mb-16 flex w-full items-center justify-between">
      
      <div>
        <h1 className="font-spartan text-[32px] font-bold tracking-[-1px] text-dark dark:text-white md:text-[36px]">
          Invoices
        </h1>
        <p className="font-spartan text-[13px] font-medium text-gray-cool dark:text-gray-border">
          <span className="hidden md:inline">There are </span>
          {filteredInvoices.length === 0 
            ? 'No invoices' 
            : `${filteredInvoices.length} total invoices`}
        </p>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        
        <FilterDropdown />
        <button 
          onClick={onNewInvoice}
          className="flex items-center gap-2 rounded-full bg-primary p-2 pr-4 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-primary-light md:gap-4"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA" fillRule="nonzero"/>
            </svg>
          </div>
          <span className="hidden md:inline">New Invoice</span>
          <span className="md:hidden">New</span>
        </button>

      </div>
    </header>
  );
};