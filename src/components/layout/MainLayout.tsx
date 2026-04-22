import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useThemeStore } from '../../store/useThemeStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useThemeStore();
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-gray-light font-spartan transition-colors duration-300 dark:bg-navy-dark">
      <Sidebar />
      <main className="flex-1 pt-[72px] md:pt-[80px] lg:pl-24 lg:pt-0">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-0 lg:py-20">
          {children}
        </div>
      </main>
    </div>
  );
};