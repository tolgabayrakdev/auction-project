"use client"
import { Button, TextInput } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'
type Props = {}

export default function page({ }: Props) {
    const [email, setEmail] = useState("");
    return (
        <div>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1>Reset Password</h1>
                            <form className="space-y-4 md:space-y-6">
                                <div className='mt-3'>
                                    <TextInput
                                        placeholder="Your email"
                                        label="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">

                                    <Link href="/auth" className="text-sm text-dark font-medium text-primary-600 hover:underline dark:text-primary-500">Login Page</Link>
                                </div>
                                <Button variant="outline" type="submit">
                                    Submit
                                </Button>

                            </form>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}