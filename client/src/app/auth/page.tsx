'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { TextInput, PasswordInput, Tabs, Button } from '@mantine/core';
import {
  IconPhoto,
  IconMessageCircle,
  IconLogin,
  IconRegistered,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email! ' }),
  password: z
    .string()
    .min(6, { message: 'Password should be min 6 letters! ' }),
});

export default function page() {
  const router = useRouter();
  // Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register Form
  const [rusername, setrUsername] = useState('');
  const [remail, setrEmail] = useState('');
  const [rpassword, setrPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8001/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (res.status === 200 && res.ok) {
        notifications.show({
          title: 'Successful',
          message: 'You are redirect...',
        });
        setTimeout(() => {
          router.push('/discover');
        }, 1000);
      } else if (res.status === 400) {
        notifications.show({
          title: 'Error',
          message: 'Check your credentials!',
          color: 'yellow',
        });
      }
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Something gone wrong!',
        color: 'red',
      });
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8001/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: rusername,
          email: remail,
          password: rpassword,
        }),
      });
      if (res.status === 201) {
        notifications.show({
          title: 'Successful',
          message: 'Account created.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        notifications.show({
          title: 'Error',
          message: 'Check your credentials!',
          color: 'yellow',
        });
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'Something gone wrong!',
        color: 'red',
      });
    }
  };

  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Tabs defaultValue="login">
                <Tabs.List>
                  <Tabs.Tab value="login" icon={<IconLogin size="0.8rem" />}>
                    Log In
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="register"
                    icon={<IconRegistered size="0.8rem" />}
                  >
                    Register
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="login" pt="xs">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleLogin}
                  >
                    <div className="mt-3">
                      <TextInput
                        placeholder="Your email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <PasswordInput
                        placeholder="Password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        href="/auth/reset-password"
                        className="text-sm text-dark font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button variant="outline" type="submit">
                      Sign In
                    </Button>
                  </form>
                </Tabs.Panel>

                <Tabs.Panel value="register" pt="xs">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign up to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleRegister}
                  >
                    <div className="mt-3">
                      <TextInput
                        placeholder="Username"
                        label="Username"
                        onChange={(e) => setrUsername(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <TextInput
                        placeholder="Your email"
                        label="Email"
                        onChange={(e) => setrEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <PasswordInput
                        placeholder="Password"
                        label="Password"
                        onChange={(e) => setrPassword(e.target.value)}
                      />
                    </div>

                    <Button variant="outline" type="submit">
                      Sign Up
                    </Button>
                  </form>
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
