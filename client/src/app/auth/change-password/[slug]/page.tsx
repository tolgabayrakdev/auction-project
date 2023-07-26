'use client';

import { Card, PasswordInput, Button, Group, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [isOkey, setIsOkey] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isChanged, setIsChanged] = useState(false);


  const handleChangePassword = async (values: any) => {
    console.log(values);
    const result = await fetch(`http://localhost:8001/api/v1/auth/change-password/${params.slug}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ password: form.values.password }),

    })
    if (result.status === 200) {
      setIsChanged(true);
      setTimeout(() => {
        router.push("/auth")
      }, 1500)
    } else {
      notifications.show({
        color: "yellow",
        title: 'Ups',
        message: 'Something going wrong!',
      })
    }
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
        setTimeout(() => {

        }, 1500)
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
            {
              isChanged ? <Alert className=' w-52 mt-1 rounded-sm' icon={<IconAlertCircle size="1rem" />} title="Successful" color="lime">
                Password changed.
              </Alert> :
                <Card shadow="sm" padding="lg" radius="md" withBorder className=' w-2/5 mt-3'>
                  <p className='text-center mt-1'>Change password.</p>
                  <form onSubmit={form.onSubmit((values) => handleChangePassword(values))}>
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

            }


          </div>
          :
          <Link className='mr-3 hover:underline text-center' href="/auth"> Go to auth page</Link>}
      {isExpired && <p className='text-center'>Reset link has expired</p>}
    </div>
  );
}
