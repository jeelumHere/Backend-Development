import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const signup = () => {

  const [msgResponse, setMsgResponse] = useState('')
  const inputData = [
    { type: "text", title: "username", placeholder: "Username" },
    { type: "email", title: "email", placeholder: "Email" },
    { type: "password", title: "password", placeholder: "Password" }
  ]

  const navigate = useNavigate();

  const handleSubmit = async (ele) => {
    ele.preventDefault();

    const formData = new FormData(ele.target)
    try {
      const res = await axios.post("/api/auth/register", formData)
      console.log(res.data);
      setMsgResponse(res.data.message)
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.message || "Something went wrong");
        setMsgResponse(err.response.message || "Something went wrong")
      }
      else if (err.request) {
        console.log('No response was sent');
        setMsgResponse('No response was sent')
      }
      else {
        console.log("Server Sider Error try in few minutes");
        setMsgResponse("Server Sider Error try in few minutes")
      }
    }
  }


  return (
    <>
      <section className='h-[60vh] flex flex-col justify-center items-center'>
        <h1 className='text-3xl my-2 font-semibold text-center'>Create Your Account</h1>
        <form onSubmit={handleSubmit} className='flex flex-col text-left sm:w-[70vw] md:w-[60vw] lg:w-[25vw] bg-green-200 p-5 rounded-md'>


          {inputData.map((ele, index) => (
            <div key={index} className='flex flex-col'>
              <label className='my-1' htmlFor={ele.title}>Enter {ele.placeholder}</label>
              <input className='border-black mb-2 p-1 border-[1px]' type={ele.type} name={ele.title} id={ele.title} placeholder={ele.placeholder} />
            </div>
          ))}

          <button className='p-2 rounded-md bg-amber-300 hover:bg-amber-500 text-white hover:cursor-pointer mt-3 duration-300' type='submit'>Submit</button>
          <div>{msgResponse}</div>

        </form>
      </section>
    </>
  )
}

export default signup
