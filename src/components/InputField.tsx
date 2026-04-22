import React from 'react';
import type { InputFieldProps } from '../types'; 
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', hideLabelOnDesktop, ...props }, ref) => (
    <div className={`flex flex-col ${className}`}>
      <div className={`mb-2 flex items-center justify-between ${hideLabelOnDesktop ? 'md:hidden' : ''}`}>
        <label className={`font-spartan text-xs font-medium ${error ? 'text-[#EC5757]' : 'text-gray-blueish dark:text-gray-border'}`}>
          {label}
        </label>
      </div>
      <input 
        ref={ref}
        {...props}
        className={`h-12 w-full cursor-pointer rounded border bg-white px-4 font-spartan text-base font-bold text-gray-950 outline-none transition-colors hover:border-[#9277FF] placeholder:text-gray-950 placeholder:opacity-40 dark:bg-navy-dark dark:text-white dark:[color-scheme:dark] dark:hover:border-[#9277FF] dark:placeholder:text-white dark:placeholder:opacity-40 ${
          error 
            ? 'border-[#EC5757] focus:border-[#EC5757]' 
            : 'border-[#DFE3FA] focus:border-primary dark:border-[#252945] dark:focus:border-primary'
        }`}
      />
    </div>
  )
);
InputField.displayName = 'InputField';