import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AxiosApi from '../api/AxiosApi'

const inputData = [
    { text: "Enter Email", data: "email", placeholder: "Email", type: "email" },
    { text: "Enter Username", data: "username", placeholder: "Username", type: "text" },
    { text: "Enter Password", data: "password", placeholder: "Password", type: "password" },
]

const Signup = () => {
    const navigate = useNavigate()
    const [responseMsg, setResponseMsg] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            const res = await AxiosApi.post(
                "/auth/register",
                formData
            );
            setResponseMsg(res.data.message);
            setTimeout(() => {
                navigate("/login")
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
                <h2 className='text-xl font-semibold mb-4 text-center'>Sign Up</h2>

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

                <label htmlFor="role" className='font-semibold mb-1'>Select Role</label>
                <select name="role" id="role" className='bg-amber-50 gap-1 p-2 mb-2'>
                    <option value="user">user</option>
                    <option value="artist">artist</option>
                </select>

                <button
                    type="submit"
                    className='px-3 py-2 rounded-md cursor-pointer bg-green-400 text-white font-medium hover:bg-green-500 transition-colors'
                >
                    Sign up
                </button>
                <div className='text-green-800 mt-2'>{responseMsg}</div>
            </form>
        </section>
    )
}

export default Signup