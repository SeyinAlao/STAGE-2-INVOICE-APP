import React from 'react';

export type InvoiceStatus = 'draft' | 'pending' | 'paid';

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  createdAt: string; 
  paymentDue: string; 
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}

export interface InvoiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceToEdit?: any; 
}

export interface FormValues {
  senderAddress: { street: string; city: string; postCode: string; country: string };
  clientName: string;
  clientEmail: string;
  clientAddress: { street: string; city: string; postCode: string; country: string };
  createdAt: string;
  paymentTerms: string | number;
  description: string;
  items: { name: string; quantity: number; price: number }[];
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  hideLabelOnDesktop?: boolean;
}
