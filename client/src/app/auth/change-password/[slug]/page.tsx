'use client';
import React, { useEffect, useState } from 'react';

export default function page({ params }: { params: { slug: string } }) {
  const [isOkey, setIsOkey] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  console.log(params.slug);

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
    <div>
      Burası Dinamik
      {isOkey && <p>Burdan şifre değiştir.</p>}
      {isExpired && <p>Reset link has expired</p>}
    </div>
  );
}
