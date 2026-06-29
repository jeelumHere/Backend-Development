import React, { useEffect, useState } from 'react'
import axios from "axios"



const Feed = () => {
    const [posts, setPosts] = useState([
        {
            _id: 1,
            image: "https://i.pinimg.com/1200x/2f/56/3f/2f563fc6e98b9f46f430cd1f1c114c5a.jpg",
            caption: "A White & Fat Bhalu"
        },
        {
            _id: 2,
            image: "https://i.pinimg.com/736x/53/77/00/537700618b96321d9a02cd7279f5c743.jpg",
            caption: "A White & Fat Bhalu"
        },
        {
            _id: 3,
            image: "https://i.pinimg.com/736x/05/bd/03/05bd03b43aa76da494299517b2073994.jpg",
            caption: "A White & Fat Bhalu"
        }

    ])

    useEffect(() =>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            console.log(res.data);
            setPosts(res.data.data)
        })
    }, [])
    

    return (
        <section className='max-w-2xl mx-auto px-4 py-8'>
            {posts.length > 0 ? (
                <div className='flex flex-col gap-6'>
                    {posts.map(post => (
                        <div key={post._id} className='bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'>
                            
                            {/* Image */}
                            <img
                                src={post.image}
                                alt={post.caption}
                                className='w-full h-64 object-cover'
                            />

                            {/* Caption */}
                            <div className='p-4'>
                                <h3 className='text-lg font-semibold text-gray-800'>{post.content}</h3>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-400 mt-10'>No posts yet.</p>
            )}
        </section>
    )
}

export default Feed
