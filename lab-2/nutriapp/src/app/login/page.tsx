'use client'
import { useForm, SubmitHandler } from "react-hook-form"

import { useRouter } from 'next/navigation'
import { useState } from "react"

type Inputs = {
    email: string
    password: string
}

type APIError = {
    msg: string
}

export default function Login() {
    const router = useRouter()
    const [errorsAPI, setErrorsAPI] = useState<APIError | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4200';

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const responseBody = await response.json();

            if (!response.ok) {
                setErrorsAPI(responseBody)
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error("Failed to make request: ", error);
        }
    }

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">Please enter a valid email.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">Please choose a password.</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    {errorsAPI && <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">{errorsAPI.msg}</div>}
                </div>
            </form>
            <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                This component instead of make a login make a submit of data to the server data that can be seen in the home
            </div>
        </div>
    );

}