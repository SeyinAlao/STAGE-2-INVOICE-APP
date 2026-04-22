import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialInvoices } from '../data'; 
import { Invoice } from '../types/index';

interface InvoiceState {
  invoices: Invoice[];
  filterStatuses: string[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updatedInvoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
  toggleFilter: (status: string) => void;
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      invoices: initialInvoices, 
      
      filterStatuses: [],
      addInvoice: (invoice) => 
        set((state) => ({ invoices: [invoice, ...state.invoices] })),
        
      updateInvoice: (id, updatedInvoice) =>
        set((state) => ({
          invoices: state.invoices.map((inv) => (inv.id === id ? updatedInvoice : inv)),
        })),
        
      deleteInvoice: (id) =>
        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id),
        })),
        
      markAsPaid: (id) =>
        set((state) => ({
          invoices: state.invoices.map((inv) => 
            inv.id === id ? { ...inv, status: 'paid' } : inv
          ),
        })),
        
      toggleFilter: (status) =>
        set((state) => ({
          filterStatuses: state.filterStatuses.includes(status)
            ? state.filterStatuses.filter((s) => s !== status)
            : [...state.filterStatuses, status],
        })),
    }),
    {
      name: 'invoice-storage', 
    }
  )
);