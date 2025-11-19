import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Continder = () => {

    const [url, setUrl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://url-shortner-e6w2.onrender.com/api/shorten`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ longurl: url }),

            });
            const data = await res.json();
            console.log(data);
            if(data.message=="shortcode exists"){
                toast.error("shortcode exists, try again!");
                return;
            }
            const short = data.shorturl;
            setShorturl(short);

            setUrl("");
        }
        catch (err) {
            console.log(err);
        }

    }


    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <form onSubmit={handlesubmit} className=''>
                    <div className="container mx-auto mt-24 mb-20 p-5 bg-white rounded-lg shadow-md w-1/2">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">URL Shortener</h2>
                        <input type="text" placeholder="Enter your long URL here" required value={url} onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">Shorten URL</button>
                    </div>
                </form>

                <div className='mb-6 mt-6'>
                    <div className='flex justify-center'>
                        <h3>Your Short Url :-</h3>
                        <p className='text-blue-600 underline'>
                            {shorturl ? shorturl : "No URL Shortened Yet"}
                        </p>
                        <button onClick={() => {
                            navigator.clipboard.writeText(shorturl);
                            toast.success("url copied!")
                        }}
                            className='bg-blue-800 rounded-md mx-6 p-1 text-semibold text-white'>copy</button>
                    </div>
                </div>

                <div className="static flex justify-center mb-36">
                    <button onClick={() => navigate('/alllinks')} className="border-teal-500 border text-xl p-3 bg-gray-200 rounded-lg">
                        Go to all links 👉
                    </button>
                </div>

            </div>
        </>
    )
}

export default Continder