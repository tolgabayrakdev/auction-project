"use client"
import Sidebar from '@/components/discover/sidebar';
import AuthWrapper from '@/util/auth-wrapper';
import React from 'react';

function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Sidebar />
      {children}
    </section>
  );
}

export default AuthWrapper(DiscoverLayout);
