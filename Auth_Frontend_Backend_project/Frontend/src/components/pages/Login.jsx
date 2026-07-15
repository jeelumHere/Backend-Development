import React from 'react'
const inputData = [
    { text: "Enter Email", data: "email", placeholder: "Email", type: "email" },
    { text: "Enter Username", data: "username", placeholder: "Username", type: "text" },
    { text: "Enter Password", data: "password", placeholder: "Password", type: "password" },
]
const Login = () => {
  return (
        <>
            <section className='flex justify-center items-center h-[80vh] w-full'>
                <form className='bg-amber-100 p-6 rounded-lg flex flex-col w-full max-w-sm shadow-md'>
                    <h2 className='text-xl font-semibold mb-4 text-center'>Login</h2>

                    {inputData.map((ele,id) => (
                        <div className='flex flex-col ' key={id}>
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
                </form>
            </section>
        </>
    )
}

export default Login
