'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
type User = {
  email: string,
  password: string
};


export default function Home() {
    const router = useRouter()
  const [data, setData] = useState<User[] | null>(null);
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4200';

      const fetchData = async () => {
          try {
              const response = await fetch(`${backendUrl}/api/v1/generalusers`);
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setData(data.data);
          } catch (error) {
              console.error("An error occurred while fetching data.", error);
          }
      }

      fetchData();
  }, []); // Empty array ensures this runs once on mount and not on updates

  if (!data) {
      return <div>Loading...</div>; // Loading state
  }
  const onHandle = ()=>{
    
        router.push('/login')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-wrap justify-around">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={onHandle}>
                        Login page
                    </button>
            <h1 className="w-full text-center text-2xl mb-6">Data from Server:</h1>
            {data.map((user, index) => (
                <div key={index} className="bg-white rounded shadow-md p-6 m-2 w-full md:w-1/3">
                    <h2 className="text-xl text-blue-600 mb-2">Email: {user.email}</h2>
                </div>
            ))}
        </div>
    </main>
  )
}
