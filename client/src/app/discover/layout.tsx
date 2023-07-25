'use client';
import Sidebar from '@/components/discover/sidebar';
import AuthWrapper from '@/util/auth-wrapper';
import { Divider } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import React, { useState } from 'react';

function DiscoverLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const handleSidebarToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  return (
    <section className="flex">
      <Sidebar isOpen={open} />
      <IconAdjustments
        className=" bg-gray-900 text-white hover:cursor-pointer hover:text-color-blue-800 mr-10 m-1 rounded-lg p-1"
        onClick={handleSidebarToggle}
      />
      <div className="p-3 pt-9">{children}</div>
    </section>
  );
}

export default AuthWrapper(DiscoverLayout);
