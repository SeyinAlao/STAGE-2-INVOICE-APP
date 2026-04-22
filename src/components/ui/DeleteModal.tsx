import React, { useEffect, useRef } from 'react';

interface DeleteModalProps {
  invoiceId: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteModal = ({ invoiceId, onCancel, onConfirm }: DeleteModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog 
      ref={dialogRef}
      onClose={onCancel}
      className="fixed inset-0 z-[100] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-none bg-black/50 p-0 px-6"
    >
      <div className="w-full max-w-[480px] rounded-lg bg-white p-8 shadow-[0px_10px_10px_-10px_rgba(72,84,159,0.10)] dark:bg-navy md:p-12">
        <h2 className="mb-3 font-spartan text-2xl font-bold text-dark dark:text-white">
          Confirm Deletion
        </h2>
        
        <p className="mb-4 font-spartan text-[13px] font-medium leading-[22px] text-gray-cool dark:text-gray-border">
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2 text-right">
          <button 
            onClick={onCancel}
            className="flex h-12 w-24 items-center justify-center rounded-3xl bg-slate-50 font-spartan text-[15px] font-bold text-gray-blueish transition-colors hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-gray-border dark:hover:bg-white dark:hover:text-dark"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="flex h-12 w-24 items-center justify-center rounded-3xl bg-rose-500 font-spartan text-[15px] font-bold text-white transition-colors hover:bg-[#FF9797]"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};