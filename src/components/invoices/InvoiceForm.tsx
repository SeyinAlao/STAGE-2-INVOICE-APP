import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useInvoiceStore } from '../../store/useInvoiceStore';
import type { FormValues, InputFieldProps, InvoiceFormProps } from '../../types';
import { InputField } from '../InputField'; 
import { CustomSelect } from '../CustomSelect';
import { CustomDatePicker } from '../../CustomDatePicker';

export const InvoiceForm = ({ isOpen, onClose, invoiceToEdit }: InvoiceFormProps) => {
  const { addInvoice, updateInvoice } = useInvoiceStore();
  const isEditing = !!invoiceToEdit;
  const defaultFormValues = {
    createdAt: new Date().toISOString().split('T')[0],
    items: [{ name: '', quantity: 1, price: 0 }],
    paymentTerms: '30' 
  };

  const incomingValues = invoiceToEdit ? {
    ...invoiceToEdit,
    createdAt: new Date(invoiceToEdit.createdAt).toISOString().split('T')[0],
  } : defaultFormValues;

  const { register, control, handleSubmit, formState: { errors }, watch, reset } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    values: incomingValues,
    resetOptions: {
      keepDirtyValues: true,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchItems = watch("items");
  const hasErrors = Object.keys(errors).length > 0;
  const onSubmit = (status: 'pending' | 'draft') => (data: FormValues) => {
    if (data.items.length === 0) return; 

    const invoiceTotal = data.items.reduce((acc: number, item: { quantity: number; price: number }) => acc + (item.quantity * item.price), 0);
    const createdDate = new Date(data.createdAt || new Date());
    const dueDate = new Date(createdDate.setDate(createdDate.getDate() + parseInt(data.paymentTerms as string || '30')));

    const formattedInvoice = {
      id: isEditing ? invoiceToEdit.id : uuidv4().slice(0, 6).toUpperCase(),
      createdAt: data.createdAt,
      paymentDue: dueDate.toISOString().split('T')[0],
      description: data.description,
      paymentTerms: parseInt(data.paymentTerms as string),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      status: isEditing ? invoiceToEdit.status : status,
      senderAddress: data.senderAddress,
      clientAddress: data.clientAddress,
      items: data.items.map((item: { name: string; quantity: number; price: number }) => ({
        ...item,
        total: item.quantity * item.price
      })),
      total: invoiceTotal,
    };

    if (isEditing && updateInvoice) {
      updateInvoice(formattedInvoice.id, formattedInvoice as any);
    } else {
      addInvoice(formattedInvoice as any);
    }
    reset();
    onClose();
  };

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 md:top-[80px] lg:top-0 lg:left-[103px] md:bg-black/25 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`} />
      <div 
        className={`fixed left-0 top-0 bottom-0 z-[110] w-full max-w-[719px] transform bg-white transition-transform duration-500 ease-in-out dark:bg-navy md:top-[80px] md:max-w-[616px] md:rounded-r-[20px] lg:top-0 lg:left-[103px] lg:w-[calc(100%-103px)] ${
          isOpen ? 'translate-x-0' : '-translate-x-[150%]'
        }`} >
        <form className="flex h-full flex-col">
          <div className="flex-none px-6 py-8 md:px-14 md:py-14">
            <h2 className="font-spartan text-2xl font-bold text-dark dark:text-white">
              {isEditing ? (
                <>Edit <span className="text-[#888EB0]">#</span>{invoiceToEdit.id}</>
              ) : (
                'New Invoice'
              )}
            </h2>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto px-6 pb-6 md:px-14">
            <div className="mb-12">
              <h3 className="mb-6 font-spartan text-base font-bold text-primary">Bill From</h3>
              <InputField 
                label="Street Address" 
                className="mb-6" 
                {...register("senderAddress.street", { required: "can't be empty" })}
                error={errors.senderAddress?.street?.message}
              />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <InputField 
                  label="City" 
                  {...register("senderAddress.city", { required: "can't be empty" })}
                  error={errors.senderAddress?.city?.message}
                />
                <InputField 
                  label="Post Code" 
                  {...register("senderAddress.postCode", { required: "can't be empty" })}
                  error={errors.senderAddress?.postCode?.message}
                />
                <InputField 
                  label="Country" 
                  className="col-span-2 md:col-span-1" 
                  {...register("senderAddress.country", { required: "can't be empty" })}
                  error={errors.senderAddress?.country?.message}
                />
              </div>
            </div>
            <div className="mb-12">
              <h3 className="mb-6 font-spartan text-base font-bold text-primary">Bill To</h3>
              <InputField 
                label="Client's Name" 
                className="mb-6" 
                {...register("clientName", { required: "can't be empty" })}
                error={errors.clientName?.message}
              />
              <InputField 
                label="Client's Email" 
                type="email"
                placeholder="e.g. email@example.com"
                className="mb-6" 
                {...register("clientEmail", { 
                  required: "can't be empty",
                  pattern: { value: /^\S+@\S+$/i, message: "invalid email" }
                })}
                error={errors.clientEmail?.message}
              />
              <InputField 
                label="Street Address" 
                className="mb-6" 
                {...register("clientAddress.street", { required: "can't be empty" })}
                error={errors.clientAddress?.street?.message}
              />
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <InputField 
                  label="City" 
                  {...register("clientAddress.city", { required: "can't be empty" })}
                  error={errors.clientAddress?.city?.message}
                />
                <InputField 
                  label="Post Code" 
                  {...register("clientAddress.postCode", { required: "can't be empty" })}
                  error={errors.clientAddress?.postCode?.message}
                />
                <InputField 
                  label="Country" 
                  className="col-span-2 md:col-span-1" 
                  {...register("clientAddress.country", { required: "can't be empty" })}
                  error={errors.clientAddress?.country?.message}
                />
              </div>
            </div>
            <div className="mb-8">
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="createdAt"
                  control={control}
                  rules={{ required: "can't be empty" }}
                  render={({ field: { value, onChange } }) => (
                    <CustomDatePicker 
                      label="Invoice Date" 
                      value={value} 
                      onChange={onChange} 
                      error={errors.createdAt?.message}
                    />
                  )}
                />
                <Controller
                  name="paymentTerms"
                  control={control}
                  rules={{ required: "can't be empty" }}
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect 
                      label="Payment Terms" 
                      value={value} 
                      onChange={onChange}
                      error={errors.paymentTerms?.message}
                      options={[
                        { value: "1", label: "Net 1 Day" },
                        { value: "7", label: "Net 7 Days" },
                        { value: "14", label: "Net 14 Days" },
                        { value: "30", label: "Net 30 Days" }
                      ]}
                    />
                  )}
                />
              </div>
              <InputField 
                label="Project Description"
                placeholder="e.g. Graphic Design Service" 
                {...register("description", { required: "can't be empty" })}
                error={errors.description?.message}
              />
            </div>
            <div>
              <h3 className="mb-6 font-spartan text-[18px] font-bold text-[#777F98]">Item List</h3>
              {fields.length > 0 && (
                <div className="hidden md:mb-4 md:grid md:grid-cols-12 md:gap-4">
                  <div className="col-span-5 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Item Name</div>
                  <div className="col-span-2 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Qty.</div>
                  <div className="col-span-3 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Price</div>
                  <div className="col-span-2 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">Total</div>
                </div>
              )}
              
              {fields.map((field, index) => {
                const quantity = watchItems?.[index]?.quantity || 0;
                const price = watchItems?.[index]?.price || 0;
                const total = quantity * price;
                return (
                  <div key={field.id} className="mb-12 grid grid-cols-12 items-center gap-4 md:mb-4">
                    <InputField 
                      label="Item Name" 
                      className="col-span-12 md:col-span-5" 
                      hideLabelOnDesktop
                      {...register(`items.${index}.name`, { required: true })}
                    />
                    <InputField 
                      label="Qty." 
                      type="number"
                      className="col-span-3 md:col-span-2" 
                      hideLabelOnDesktop
                      {...register(`items.${index}.quantity`, { required: true, valueAsNumber: true })}
                    />
                    <InputField 
                      label="Price" 
                      type="number"
                      step="0.01"
                      className="col-span-4 md:col-span-3" 
                      hideLabelOnDesktop
                      {...register(`items.${index}.price`, { required: true, valueAsNumber: true })}
                    />
                    
                    <div className="col-span-5 flex h-12 items-center justify-between md:col-span-2">
                      <div className="flex flex-col justify-center md:hidden">
                        <label className="mb-2 font-spartan text-xs font-medium text-gray-blueish dark:text-gray-border">
                          Total
                        </label>
                        <span className="font-spartan text-[15px] font-bold text-gray-cool dark:text-gray-border">
                          {total.toFixed(2)}
                        </span>
                      </div>
                      <div className="hidden h-full items-center font-spartan text-[15px] font-bold text-gray-cool dark:text-gray-border md:flex">
                        {total.toFixed(2)}
                      </div>

                      <button 
                        type="button"
                        onClick={() => remove(index)}
                        className="group mt-[26px] p-2 transition-colors md:mt-0"
                      >
                        <svg className="fill-[#888EB0] transition-colors group-hover:fill-[#EC5757]" width="13" height="16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.778 1.778H2.694a1.778 1.778 0 01-1.778-1.778V3.556h10.667zM8.472 0H4.028v2.667H0v1.778h12.5V2.667h-4.028V0z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <button 
                type="button"
                onClick={() => append({ name: '', quantity: 1, price: 0 })}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-[#F9FAFE] font-spartan text-[15px] font-bold text-gray-blueish transition-colors hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-gray-border dark:hover:bg-[#1E2139] dark:hover:text-white"
              > + Add New Item </button>

              {(hasErrors || fields.length === 0) && (
                <div className="mt-8 flex flex-col justify-start font-spartan text-[10px] font-semibold leading-4 text-[#EC5757]">
                  {hasErrors && <span>- All fields must be added</span>}
                  {fields.length === 0 && <span>- An item must be added</span>}
                </div>
              )}
            </div>
          </div>
<div className="flex-none rounded-br-[20px] bg-white px-4 py-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] dark:bg-navy md:rounded-r-[20px] md:px-14">
  <div className={`flex items-center ${isEditing ? 'justify-end gap-2' : 'justify-between'}`}>
    
    {!isEditing && (
      <button 
        type="button"
        onClick={onClose}
        className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#F9F9FD] px-3 font-spartan text-xs font-bold leading-4 text-[#7E88C3] transition-colors hover:bg-[#DFE3FA] dark:bg-[#F9FAFE] dark:text-[#7E88C3] md:px-6 md:text-base"
      > 
        Discard 
      </button>
    )}
    
    {isEditing ? (
      <>
        <button 
          type="button"
          onClick={onClose}
          className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#F9F9FD] px-4 font-spartan text-xs font-bold leading-4 text-[#DFE3FA] transition-colors hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#7E88C3] md:px-6 md:text-base"
        > 
          Cancel 
        </button>
        <button 
          type="button"
          onClick={handleSubmit(onSubmit('pending'))}
          className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 font-spartan text-xs font-bold text-white transition-colors hover:bg-primary-light md:px-6 md:text-[15px]"
        > 
          Save Changes 
        </button>
        </>
         ) : (
        <div className="flex gap-2">
          <button 
           type="button"
           onClick={handleSubmit(onSubmit('draft'))}
           className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#373B53] px-3 font-spartan text-xs font-bold text-gray-blueish transition-colors hover:bg-dark dark:text-gray-border dark:hover:bg-[#373B53] dark:hover:text-gray-border md:px-6 md:text-[15px]"
          > 
           Save as Draft 
          </button>
          <button 
            type="button"
            onClick={handleSubmit(onSubmit('pending'))}
            className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-primary px-3 font-spartan text-xs font-bold text-white transition-colors hover:bg-primary-light md:px-6 md:text-[15px]"
          > 
             Save & Send 
          </button>
          </div>
            )}

          </div>
        </div>

        </form>
      </div>
    </>
  );
};