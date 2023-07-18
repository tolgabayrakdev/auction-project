"use client"
import { Button } from "antd"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <main>     
     <Button onClick={()=> router.push("/settings")} type="dashed">Button</Button>
    </main>
  )
}
