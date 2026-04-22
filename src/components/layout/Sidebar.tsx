import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const Sidebar = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <aside className="fixed left-0 top-0 z-[60] flex w-full flex-row items-center justify-between bg-[#373B53] transition-colors duration-300 dark:bg-navy-darker lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-br-[20px] lg:rounded-tr-[20px]">
      
      <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-br-[20px] rounded-tr-[20px] bg-primary md:h-[80px] md:w-[80px] lg:h-[103px] lg:w-[103px]">
        <div className="absolute bottom-0 h-[50%] w-full rounded-tl-[20px] bg-primary-light"></div>
        <img src="/src/assets/Group 9.svg" alt="App Logo" className="relative z-10 w-7 md:w-8 lg:w-10" />
      </div>

      <div className="flex h-[72px] flex-row items-center justify-end md:h-[80px] lg:h-auto lg:w-full lg:flex-col">
        <button 
          onClick={toggleTheme}
          className="mr-6 text-[#858BB2] transition-colors hover:text-[#DFE3FA] lg:mb-6 lg:mr-0 lg:mt-6"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.808 4.593c-1.125 3.162-.304 5.452 1.82 7.046 2.501 1.876 5.376 1.621 7.242.2-1.637 4.14-5.918 6.467-10.024 5.385-4.467-1.178-7.398-5.748-6.54-10.334.821-4.394 4.596-7.518 8.948-7.79a9.02 9.02 0 00-1.446 5.493z" fill="currentColor" fillRule="nonzero"/>
            </svg>
          ) : (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.868 11.415A3.468 3.468 0 0013.336 8a3.468 3.468 0 00-3.468-3.415A3.468 3.468 0 006.4 8a3.468 3.468 0 003.468 3.415zm0 1.95A5.419 5.419 0 014.45 8a5.419 5.419 0 015.418-5.365A5.419 5.419 0 0115.286 8a5.419 5.419 0 01-5.418 5.365zM9.868 2.05a.975.975 0 01-.975-.975v-.1a.975.975 0 011.95 0v.1a.975.975 0 01-.975.975zm0 13.95a.975.975 0 01-.975-.975v-.1a.975.975 0 011.95 0v.1a.975.975 0 01-.975.975zM2.87 4.093a.975.975 0 01-.69-1.664l.071-.071a.975.975 0 011.378 1.379l-.07.07a.975.975 0 01-.69.286zm13.996 7.814a.975.975 0 01-.69-1.664l.07-.07a.975.975 0 111.379 1.378l-.071.071a.975.975 0 01-.688.285zM4.093 16.866a.975.975 0 01-.69-1.664l.07-.071a.975.975 0 111.379 1.379l-.071.07a.975.975 0 01-.688.286zm11.55-11.55a.975.975 0 01-.689-1.664l.07-.07a.975.975 0 011.38 1.378l-.071.071a.975.975 0 01-.69.285z" fill="currentColor" fillRule="nonzero"/>
            </svg>
          )}
        </button>
        
        <div className="h-full w-[1px] bg-[#494E6E] lg:h-[1px] lg:w-full"></div>
        
        <div className="ml-6 mr-6 flex items-center lg:mb-6 lg:ml-0 lg:mr-0 lg:mt-6">
          <img src="/src/assets/Oval.svg" alt="User Avatar" className="h-8 w-8 rounded-full md:h-10 md:w-10" />
        </div>
      </div>
      
    </aside>
  );
};