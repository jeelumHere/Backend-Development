import React, { useEffect, useState } from 'react'
import axios from "axios"

const Feed = () => {
    const [post, setPost] = useState([])

    useEffect(() => {

        axios.get("http://localhost:3000/post")
            .then(res => {
                console.log(res.data.Data)
                setPost(res.data.Data)
            })
            .catch(err => console.error("Error fetching data:", err))

    }, [])

    const handleDeletepost = async (postId) => {
        axios.delete(`http://localhost:3000/post/${postId}`)
            .then(() => {
                setPost(prev => prev.filter(e => postId !== e._id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteImage = async (postId, imageId) => {
        axios.delete(`http://localhost:3000/post/${postId}/image/${imageId}`)
            .then(() => {
                setPost(prev => prev.map((ele) =>
                    ele._id === postId
                        ? { ...ele, images: ele.images.filter(e => e._id !== imageId) }
                        : ele
                ))
            })
            .catch((err) => {
                console.log("error occurred : ", err)
            })
    }


    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 justify-items-center'>
            {post.map((ele) => (
                <div key={ele._id} className='flex flex-col gap-3 items-center w-full max-w-125 bg-gray-400 rounded-3xl p-4 shadow-md'>
                    <h1 className='text-3xl font-bold text-center wrap-break-words w-full'>{ele.title}</h1>

                    <div className='flex flex-col gap-4 w-full'>
                        {ele.images && ele.images.map((e) => (
                            <div key={e._id} className='flex flex-col gap-2 w-full'>
                                <div className='w-full aspect-video overflow-hidden rounded-2xl bg-gray-500'>
                                    <img className='w-full h-full object-cover' src={e.url} alt={ele.title} />
                                </div>
                                <button
                                    className='text-red-600 bg-white px-3 py-1 rounded-md self-center hover:bg-red-500 hover:text-white duration-200'
                                    onClick={() => handleDeleteImage(ele._id, e._id)}
                                >
                                    Delete Image
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className='text-center wrap-break-words w-full px-2'>{ele.caption}</p>
                    <button className='p-2 bg-white rounded-2xl hover:cursor-pointer hover:bg-red-400 hover:text-white duration-200' onClick={() => handleDeletepost(ele._id)} >Delete Post</button>
                </div>
            ))}
        </div>
    )
}

export default Feed
