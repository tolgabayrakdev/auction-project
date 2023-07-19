"use client"
import Header from '@/components/global/header';
import './globals.css'
import React from 'react';
import Footer from '@/components/global/footer';
import Sidebar from '@/components/global/sidebar';




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='min-h-screen flex flex-col'>
        <Header />
        <div className="flex-1 flex flex-col sm:flex-row">
          <main className="flex-1 bg-indigo-100"> {children} </main>
          <Sidebar />
          <aside className="sm:w-32 bg-yellow-100">Right Sidebar</aside>
        </div>
        <Footer />
      </body>
    </html>
  )
}



