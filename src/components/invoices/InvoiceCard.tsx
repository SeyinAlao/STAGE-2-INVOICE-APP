import React from 'react';
import { Invoice } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { Link } from 'react-router-dom';

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const formattedDate = new Date(invoice.paymentDue).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(invoice.total);

  return (
    <Link 
      to={`/invoice/${invoice.id}`}
      className="mb-4 block cursor-pointer rounded-lg border border-transparent bg-white p-6 shadow-sm transition-all hover:border-primary dark:bg-navy"
    >
      <div className="grid grid-cols-2 items-center gap-y-6 md:hidden">
        <span className="font-spartan text-[15px] font-bold text-dark dark:text-white text-left">
          <span className="text-gray-blueish">#</span>{invoice.id}
        </span>
        <span className="text-right font-spartan text-[13px] font-medium text-gray-cool dark:text-white">
          {invoice.clientName}
        </span>
        <div className="flex flex-col gap-2 text-left">
          <span className="font-spartan text-[13px] font-medium text-gray-blueish dark:text-gray-border">
            Due {formattedDate}
          </span>
          <span className="font-spartan text-[15px] font-bold text-dark dark:text-white">
            {formattedTotal}
          </span>
        </div>
        <div className="flex justify-end items-center">
          <StatusBadge status={invoice.status} />
        </div>
        
      </div>
      <div className="hidden md:flex md:w-full md:items-center md:justify-between">
        <div className="flex items-center justify-start md:w-1/2">
          <span className="font-spartan text-[15px] font-bold text-dark dark:text-white md:w-24">
            <span className="text-gray-blueish">#</span>{invoice.id}
          </span>
          <span className="font-spartan text-[13px] font-medium text-gray-blueish dark:text-gray-border md:w-36">
            Due {formattedDate}
          </span>
          <span className="text-left font-spartan text-[13px] font-medium text-gray-cool dark:text-white md:w-32">
            {invoice.clientName}
          </span>
        </div>
        <div className="flex items-center justify-end gap-10 md:w-1/2">
          <span className="font-spartan text-[15px] font-bold text-dark dark:text-white md:text-[18px]">
            {formattedTotal}
          </span>
          <div className="flex items-center gap-8">
            <StatusBadge status={invoice.status} />
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
            </svg>
          </div>
        </div>
        
      </div>

    </Link>
  );
};