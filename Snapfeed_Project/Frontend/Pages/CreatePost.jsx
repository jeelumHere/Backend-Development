import React from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"


const CreatePost = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const formData = new FormData(e.target)

    axios.post("http://localhost:3000/create-post",formData)
    .then((res)=>{
      console.log(res)
      navigate("/feed")
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
    
    <section className='flex flex-col justify-center items-center'>

      <h1 className='text-4xl font-bold mb-2'>Create Post</h1>

      <form onSubmit={handleSubmit} className='bg-amber-100 p-4 mb-2 rounded-2xl flex flex-col gap-2.5' method='/post' action='upload'>

        <label for="images">Select images:</label>
          <div><input className='bg-white p-2 rounded-md w-full' type="file" multiple placeholder='Select Images'name='images' accept='image/*' /></div>

          <label>Enter Title</label>
          <div ><input className='bg-white p-2 rounded-md w-full' type="text" name='title' pattern="^\s*(\S+\s*){0,5}$"/></div>

          <label>Enter Caption</label>
          <div><textarea className='bg-white p-2 w-full rounded-md' name="caption"></textarea></div>

          <button className='p-2 bg-white hover:cursor-pointer font-semibold hover:shadow-amber-600 rounded-2xl' type='submit'>Submit</button>

      </form>
    </section>
    </>
  )
}

export default CreatePost
