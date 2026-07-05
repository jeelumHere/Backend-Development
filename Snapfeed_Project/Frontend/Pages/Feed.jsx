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

    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 justify-items-center'>
            {post.map((ele) => (
                <div key={ele._id} className='flex flex-col gap-3 items-center w-full max-w-[500px] bg-gray-400 rounded-3xl p-4 shadow-md'>
                    <h1 className='text-3xl font-bold text-center break-words w-full'>{ele.title}</h1>

                    <div className='flex gap-2'>

                    {/* FIXED: Changed curly braces to parentheses for implicit return */}
                    {ele.images && ele.images.map((e, index) => (
                        <div key={index} className='w-full aspect-3/2 overflow-hidden rounded-2xl bg-gray-500'>
                            <img className='w-full h-full object-cover' src={e.url} alt={ele.title} />
                        </div>
                    ))}

                    </div>

                    <p className='text-center wrap-break-words w-full px-2'>{ele.caption}</p>
                </div>
            ))}
        </div>
    )
}

export default Feed
