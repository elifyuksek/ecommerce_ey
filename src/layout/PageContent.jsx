import React from 'react';
export default function PageContent({ children }) {
  return (
    <main className="w-full flex flex-col flex-grow bg-white">
      {children}
    </main>
  );
}