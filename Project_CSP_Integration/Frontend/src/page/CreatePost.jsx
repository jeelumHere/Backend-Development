import React from 'react'

const createPost = () => {
    return (
        <section className='w-full flex justify-center items-center'>
            <div className='text-black p-5 bg-yellow-200 border-2 sm:w-full md:w-[70%] lg:w-[50%] font-semibold flex justify-center items-center flex-col mt-10 rounded-md'>
                <h1 className='font-bold text-4xl pb-3'>Create Post</h1>


                <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-600 rounded-md cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors'>
                    <span className='text-amber-600 text-sm font-medium'>Click to upload image</span>
                    <span className='text-gray-400 text-xs mt-1'>PNG, JPG, WEBP supported</span>
                    <input type="file" name="image" accept='image/*' className='hidden' />
                </label>

                <textarea
                    className='bg-white text-black p-3 border-2 border-gray-300 my-3 w-full text-sm rounded-md resize-none focus:outline-none focus:border-amber-600 transition-colors min-h-[120px]'
                    placeholder="Write your content here..."
                    name="content"
                    rows={5}
                    required
                />
                <button className='bg-amber-600 font-bold hover:bg-amber-800 hover:text-white py-2 px-3 rounded-2xl hover:cursor-pointer duration-300n-' type='submit'>Submit</button>
            </div>

        </section>
    )
}

export default createPost
