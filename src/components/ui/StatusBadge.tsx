import React from 'react';
import { InvoiceStatus } from '../../types';

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    paid: 'bg-[#33D69F]/10 text-[#33D69F]',
    pending: 'bg-[#FF8F00]/10 text-[#FF8F00]',
    draft: 'bg-[#373B53]/10 text-[#373B53] dark:bg-[#DFE3FA]/10 dark:text-[#DFE3FA]',
  };

  const dotColors = {
    paid: 'bg-[#33D69F]',
    pending: 'bg-[#FF8F00]',
    draft: 'bg-[#373B53] dark:bg-[#DFE3FA]',
  };

  return (
    <div className={`flex h-10 w-[104px] items-center justify-center gap-2 rounded-md ${styles[status]}`}>
      <div className={`h-2 w-2 rounded-full ${dotColors[status]}`}></div>
      <span className="font-spartan text-xs font-bold capitalize pt-1">
        {status}
      </span>
    </div>
  );
};