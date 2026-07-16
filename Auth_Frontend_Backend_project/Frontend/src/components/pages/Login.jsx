import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AxiosApi from '../api/AxiosApi'

const inputData = [
    { text: "Enter Username", data: "username", placeholder: "Username", type: "text" },
    { text: "Enter Email", data: "email", placeholder: "Email", type: "email" },
    { text: "Enter Password", data: "password", placeholder: "Password", type: "password" },
]

const Login = () => {

    const navigation = useNavigate()
    const [responseMsg, setResponseMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const res = await AxiosApi.post(
                "/auth/login",
                formData,
            );
            setResponseMsg(res.data.message);
            setTimeout(() => {
                navigation("/")
            }, 3000);
        } catch (err) {
            if (err.response) {
                // server responded with a status outside 2xx (409 conflict, 401, 500, etc.)
                setResponseMsg(err.response.data.message || "Something went wrong");
            } else if (err.request) {
                // request went out, no response came back (server down, network issue)
                setResponseMsg("No response from server. Please try again.");
            } else {
                // something broke setting up the request itself
                setResponseMsg("Unexpected error occurred.");
            }
            console.log(err);
        }
    };

    return (
        <section className='flex justify-center items-center h-[80vh] w-full'>
            <form onSubmit={handleSubmit} className='bg-amber-100 p-6 rounded-lg flex flex-col w-full max-w-sm shadow-md'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>

                {inputData.map((ele) => (
                    <div className='flex flex-col' key={ele.data}>
                        <label htmlFor={ele.data} className='text-sm font-medium mb-1'>{ele.text}</label>
                        <input
                            id={ele.data}
                            name={ele.data}
                            className='border border-gray-300 p-2 rounded-md mb-3 outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400'
                            type={ele.type}
                            placeholder={ele.placeholder}
                            required
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className='px-3 py-2 rounded-md cursor-pointer bg-green-400 text-white font-medium hover:bg-green-500 transition-colors'
                >
                    Login
                </button>
                <div className='text-green-700 mt-2'>{responseMsg}</div>
            </form>
        </section>
    )
}

export default Login