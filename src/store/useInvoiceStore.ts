import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: 'paid' | 'pending' | 'draft';
  senderAddress: { street: string; city: string; postCode: string; country: string };
  clientAddress: { street: string; city: string; postCode: string; country: string };
  items: { name: string; quantity: number; price: number; total: number }[];
  total: number;
}

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
      invoices: [], 
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