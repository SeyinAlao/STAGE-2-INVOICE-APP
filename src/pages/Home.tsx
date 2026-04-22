import React, { useState } from 'react';
import { Header } from '../components/invoices/Header';
import { EmptyState } from '../components/invoices/EmptyState';
import { InvoiceCard } from '../components/invoices/InvoiceCard';
import { useInvoiceStore } from '../store/useInvoiceStore';
import { InvoiceForm } from '../components/invoices/InvoiceForm';

export const Home = () => {
  const { invoices, filterStatuses } = useInvoiceStore();

  const filteredInvoices = filterStatuses.length > 0 
    ? invoices.filter(inv => filterStatuses.includes(inv.status))
    : invoices;

  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Header onNewInvoice={() => setIsFormOpen(true)} />
      {filteredInvoices.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <InvoiceForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </>
  );
};