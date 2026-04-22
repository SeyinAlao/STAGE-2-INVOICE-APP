import React from 'react';
import EmptyIllustration from '../../assets/Email campaign_Flatline 2.svg';

export const EmptyState = () => {
  return (
    <div className="mt-[140px] flex w-full flex-col items-center justify-center text-center">
      <img
        src={EmptyIllustration}
        alt="No invoices illustration"
        className="mb-16 w-[240px]"
      />
      <h2 className="mb-6 font-spartan text-2xl font-bold tracking-[-0.75px] text-dark dark:text-white">
        There is nothing here
      </h2>
      <p className="font-spartan text-xs font-medium leading-4 text-gray-cool dark:text-gray-border">
        Create an invoice by clicking the <br/>
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </div>
  );
};