// src/components/layout/Layout.js
import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        {children}
      </main>
    </>
  );
}