import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { useInvoiceStore } from '../store/useInvoiceStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DeleteModal } from '../components/ui/DeleteModal';
import { InvoiceForm } from '../components/invoices/InvoiceForm'; 

export const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { invoices, deleteInvoice, markAsPaid } = useInvoiceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const invoice = invoices.find((inv) => inv.id === id);

  const handleDeleteConfirm = () => {
    if (invoice) {
      deleteInvoice(invoice.id);
      navigate('/'); 
    }
  };

  if (!invoice) {
    return (
      <div className="text-center font-spartan text-dark dark:text-white">
        <h2 className="text-2xl font-bold">Invoice Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  return (
    <div className="w-full pb-24 md:pb-0">
      <Link 
        to="/" 
        className="mb-8 flex w-max items-center gap-6 font-spartan text-[15px] font-bold text-dark transition-colors hover:text-gray-blueish dark:text-white"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
        Go back
      </Link>

      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-6 shadow-sm dark:bg-navy">
        <div className="flex w-full items-center justify-between md:w-auto md:justify-start md:gap-4">
          <span className="font-spartan text-xs font-medium text-gray-cool dark:text-gray-border">
            Status
          </span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button 
            onClick={() => setIsEditFormOpen(true)}
            className="rounded-full bg-gray-light px-6 py-4 font-spartan text-[15px] font-bold text-gray-blueish transition-colors hover:bg-[#DFE3FA] dark:bg-navy-dark dark:text-gray-border dark:hover:bg-white dark:hover:text-dark"
          >
            Edit
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[#EC5757] px-6 py-4 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-[#FF9797]"
          >
            Delete
          </button>
          {invoice.status !== 'paid' && (
            <button 
              onClick={() => markAsPaid(invoice.id)}
              className="rounded-full bg-primary px-6 py-4 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-primary-light"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-navy md:p-12">
        <div className="mb-8 flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <h1 className="font-spartan text-base font-bold text-dark dark:text-white">
              <span className="text-gray-blueish">#</span>{invoice.id}
            </h1>
            <p className="mt-1 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">
              {invoice.description}
            </p>
          </div>
          <div className="flex flex-col font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border md:text-right">
            <span>{invoice.senderAddress.street}</span>
            <span>{invoice.senderAddress.city}</span>
            <span>{invoice.senderAddress.postCode}</span>
            <span>{invoice.senderAddress.country}</span>
          </div>
        </div>
        <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-3">
          
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-3 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Invoice Date</p>
              <p className="font-spartan text-[15px] font-bold text-dark dark:text-white">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="mb-3 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Payment Due</p>
              <p className="font-spartan text-[15px] font-bold text-dark dark:text-white">{formatDate(invoice.paymentDue)}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mb-3 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Bill To</p>
            <p className="mb-2 font-spartan text-[15px] font-bold text-dark dark:text-white">{invoice.clientName}</p>
            <div className="flex flex-col font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">
              <span>{invoice.clientAddress.street}</span>
              <span>{invoice.clientAddress.city}</span>
              <span>{invoice.clientAddress.postCode}</span>
              <span>{invoice.clientAddress.country}</span>
            </div>
          </div>

          <div className="col-span-2 flex flex-col md:col-span-1">
            <p className="mb-3 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Sent to</p>
            <p className="font-spartan text-[15px] font-bold text-dark dark:text-white">{invoice.clientEmail}</p>
          </div>
          
        </div>

        <div className="overflow-hidden rounded-lg bg-[#F9FAFE] dark:bg-[#252945]">
          <div className="p-6 md:p-8">
            <div className="mb-6 hidden grid-cols-5 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border md:grid">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            <div className="flex flex-col gap-6">
              {invoice.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between md:grid md:grid-cols-5">
                  <div className="col-span-2 flex flex-col font-spartan text-[15px] font-bold text-dark dark:text-white">
                    <span>{item.name}</span>
                    <span className="mt-2 text-gray-blueish dark:text-gray-border md:hidden">
                      {item.quantity} x {formatCurrency(item.price)}
                    </span>
                  </div>
                  <span className="hidden text-center font-spartan text-[15px] font-bold text-gray-blueish dark:text-gray-border md:block">
                    {item.quantity}
                  </span>
                  <span className="hidden text-right font-spartan text-[15px] font-bold text-gray-blueish dark:text-gray-border md:block">
                    {formatCurrency(item.price)}
                  </span>
                  <span className="text-right font-spartan text-[15px] font-bold text-dark dark:text-white">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#373B53] p-6 text-white dark:bg-[#0C0E16] md:px-8 md:py-6">
            <span className="font-spartan text-xs font-medium">Amount Due</span>
            <span className="font-spartan text-2xl font-bold">{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-white p-6 shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.1)] dark:bg-navy md:hidden">
        <button 
          onClick={() => setIsEditFormOpen(true)}
          className="rounded-full bg-gray-light px-6 py-4 font-spartan text-[15px] font-bold text-gray-blueish transition-colors hover:bg-[#DFE3FA] dark:bg-navy-dark dark:text-gray-border dark:hover:bg-white dark:hover:text-dark"
        >
          Edit
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-[#EC5757] px-6 py-4 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-[#FF9797]"
        >
          Delete
        </button>
        {invoice.status !== 'paid' && (
          <button 
            onClick={() => markAsPaid(invoice.id)}
            className="rounded-full bg-primary px-6 py-4 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-primary-light"
          >
            Mark as Paid
          </button>
        )}
      </div>

      {isModalOpen && (
        <DeleteModal 
          invoiceId={invoice.id} 
          onCancel={() => setIsModalOpen(false)} 
          onConfirm={handleDeleteConfirm} 
        />
      )}

      <InvoiceForm 
        isOpen={isEditFormOpen} 
        onClose={() => setIsEditFormOpen(false)} 
        invoiceToEdit={invoice} 
      />

    </div>
  );
};