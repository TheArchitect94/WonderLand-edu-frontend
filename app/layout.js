"use client"
import React from 'react';
import CSProviders from '@Components/CSProviders';

export const metadata = {
  title: 'Wonderland Grammar School',
  description: 'Wonderland Educational Website',
};

const Rootlayout = ({ children }) => {
  return (
    <CSProviders>
    <body>
      {children}
    </body>
     </CSProviders>
  );
};

export default Rootlayout;
