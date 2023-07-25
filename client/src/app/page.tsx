'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex flex-col">
      <h3 className="text-center text-xl mt-1">Welcome Auction Project</h3>
      <Link
        className="text-center text-lg mt-3 text-blue-600 hover:underline"
        href="/discover"
      >
        {' '}
        Discover
      </Link>
    </section>
  );
}
