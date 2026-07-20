import React, { useEffect, useState } from 'react'
import AxiosApi from '../api/AxiosApi'
import Navbar from "../Navbar"

const Home = () => {

  const [myMusic, setMyMusic] = useState([])

  const [msgResponse, setMsgResponse] = useState('')
  const [msgResponse02, setMsgResponse02] = useState('')
  const [isArtist, setIsArtist] = useState(false)

  useEffect(() => {
    let isMounted = true;

    async function runApi() {
      try {
        const res = await AxiosApi.get("/auth/getMe");
        
        if (isMounted) {
          const userRole = res?.data?.User?.role;
          setIsArtist(userRole === "artist");
        }
      } catch (err) {
        if (!isMounted) return;

        if (err.response) {
          setMsgResponse(err.response.data?.message || "Something went wrong");
          console.log(err.response.data?.message || "Something went wrong");
        } else if (err.request) {
          setMsgResponse("No response received from server")
          console.log("No response received from server");
        } else {
          setMsgResponse("Error setting up request: ", err.message);
          console.log("Error setting up request: ", err.message);
        }
      }
    }

    runApi();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const runApi = async () => {
      try {
        const res = await AxiosApi.get("/music/getAllMusic")
        console.log(res.data.message);
        setMyMusic(res.data.Music)
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data?.message || "Something went wrong");
        }
        else if (err.request) {
          console.log("No response received from server");
        }
        else {
          console.log("Error setting up request: ", err.message);
        }
      }
    }
    runApi()

  }, [])


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      setMsgResponse02("Processing...")
      const res = await AxiosApi.post("/music/createMusic", formData);
      console.log("Upload Success:", res.data);
      setMsgResponse02("Track published successfully!");
    } catch (err) {
      if (err.response) {
        setMsgResponse02(err.response.data.message || "Something went wrong")
        console.log(err.response.data.message || "Something went wrong");
        console.log(err.response.data);
      } else if (err.request) {
        setMsgResponse02("Response not received")
        console.log("Response not received");
      } else {
        setMsgResponse02("Server Error");
        console.log("Server Error");
      }
    }
  }

  // Component Return (placed outside handleSubmit)
  return (
    <>
      <Navbar />

      <section className="bg-gray-50 flex items-center justify-center p-6">
        {isArtist  ? (
          <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Music</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Title Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Enter Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title" /* Added missing name attribute */
                  placeholder="e.g. Midnight Dreams"
                  required
                  className="w-full px-3.5 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                />
              </div>

              {/* Genre Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="genre" className="text-sm font-medium text-gray-700">
                  Enter Genre
                </label>
                <input
                  type="text"
                  id="genre"
                  name="genre" /* Added missing name attribute */
                  placeholder="e.g. Country"
                  required
                  className="w-full px-3.5 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                />
              </div>

              {/* File Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="music" className="text-sm font-medium text-gray-700">
                  Upload Audio File
                </label>
                <input
                  type="file"
                  id="music"
                  name="music"
                  accept="audio/*,.mp3,.wav,.ogg,.m4a"
                  required
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg shadow-sm cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2.5 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
              >
                Publish Track
              </button>
            </form>
            <div>{msgResponse02}</div>
          </div>
        ) : ('')}
      </section>

      <h1 className='text-center font-semibold text-4xl my-4'>Music is here!!</h1>
      <section className='px-8 mb-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        {myMusic.map((ele, index) => (

          <div key={index} className='bg-red-200 p-6 rounded-lg flex flex-col gap-2'>

            <h1 className='text-3xl text-orange-900'>{ele.title}</h1>

            <h2 className='text-xl text-green-600'>{ele.genre}</h2>
            <h2 className='text-xl text-green-600'>Artist : {ele.artist.username}</h2>

            <audio controls className="w-full">
              <source src={ele.uri} />
            </audio>

          </div>
        ))}

      </section>
    </>
  );
};

export default Home;


