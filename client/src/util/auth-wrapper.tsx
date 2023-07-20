"use client"
import Spinner from "@/components/spinner/spinner";
import Link from "next/link";
import React, { useEffect, useState } from "react";


function AuthWrapper(WrappedComponent: any) {
    const Wrapper = (props: any) => {
        const [loading, setLoading] = useState(true);
        const [accessDenied, setAccessDenied] = useState(false);


        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch("http://localhost:8000/api/v1/auth/verify", {
                        method: "POST",
                        credentials: "include"
                    });
                    if (res.status === 200) {
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setAccessDenied(true);
                    }
                } catch (error) {
                    setLoading(false);
                    setAccessDenied(true);
                }
            }
            verifyToken();
        }, [])

        if (loading) {
            return (
                <Spinner />
            )
        }
        if (accessDenied) {
            return (
                <>
                    <div className="">
                        <p className="text-center text-3xl text-red-600">
                            Access Denied, you can not view this page
                        </p>
                        <div className="text-center">
                            <Link className="text-blue-500 hover:underline" href="/auth"> Go to login page</Link>
                        </div>
                    </div>

                </>
            )
        }

        return (
            <section>
                <WrappedComponent {...props} />
            </section>
        )
    }

    return Wrapper;

}

export default AuthWrapper;