'use client';

import { Card, PasswordInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function page({ params }: { params: { slug: string } }) {
  const form = useForm({
    initialValues: {
      password: 'secret',
      confirmPassword: 'sevret',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [isOkey, setIsOkey] = useState(false);
  const [isExpired, setIsExpired] = useState(false);


  const handleChangePassword = async () => {
    const result = await fetch("http://localhost:8001/api/v1/auth/")
  }

  useEffect(() => {
    const checkResetToken = async () => {
      const result = await fetch(
        `http://localhost:8001/api/v1/auth/verify-token/${params.slug}`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );
      if (result.status === 200) {
        setIsOkey(true);
      } else if (result.status === 400) {
        setIsExpired(true);
      }
    };
    checkResetToken();
  }, []);

  return (
    <div className='flex justify-center flex-col'>
      {
        isOkey ?
          <div className='flex justify-center'>
            <Card shadow="sm" padding="lg" radius="md" withBorder className=' w-2/5 mt-3'>
              <p className='text-center mt-1'>Change password.</p>
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps('password')}
                />

                <PasswordInput
                  mt="sm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  {...form.getInputProps('confirmPassword')}
                />

                <Group position="right" mt="md">
                  <Button type="submit" variant="default">Submit</Button>
                </Group>
              </form>
              <Link className='mr-3 hover:underline text-center' href="/auth"> Go to auth page</Link>

            </Card>
            
          </div>
          :
          <Link className='mr-3 hover:underline text-center' href="/auth"> Go to auth page</Link>}
      {isExpired && <p className='text-center'>Reset link has expired</p>}
    </div>
  );
}
