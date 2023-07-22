"use client"
import { Divider } from '@mantine/core'
import React, { useEffect, useState } from 'react'

type Props = {}
type User = {
    username: string,
    email: string,
    address: string,
    phone_number: string
}

export default function page({ }: Props) {
    const [user, setUser] = useState<User>();


    useEffect(() => {

        const getInformation = async () => {
            try {
                const res = await fetch('http://localhost:8001/api/v1/auth/verify', {
                    method: 'POST',
                    credentials: 'include',
                });
                const data = await res.json()
                setUser(data.user)
            } catch (error) {
                console.log(error);
            }
        }
        getInformation();
    }, [])

    return (
        <div>
            <h1>User Information</h1>
            <Divider />
            <div>
                <p>Username: {user?.username} </p>
                <p>Email: {user?.email} </p>

            </div>
        </div>
    )
}