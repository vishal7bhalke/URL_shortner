import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AllLinks = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/allLinks");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCopy = (shorturl) => {
    navigator.clipboard.writeText(shorturl);
    toast.success("Short URL copied!");
  };

 
  const handleDelete = async (id) => {
  try{
     const res=await fetch(`http://localhost:5000/api/delete/${id}`,{
    method:"DELETE",
   })
   const data=await res.json();
   fetchLinks();
   toast.success(data.message);
    }
    catch(err){
      console.log(err); 
  }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <button onClick={()=> navigate('/')} className="mb-8 bg-gray-200 p-1.5 rounded-md">👈back</button>
      <h2 className="text-2xl font-semibold mb-4">All Shortened Links</h2>

      {links.length === 0 ? (
        <p>No links found</p>
      ) : (
        <ul>
          {links.map((link) => (
            <li key={link._id} className="mb-3 flex items-center justify-between border p-3 rounded-lg">
              <div>
                <p className="text-blue-600 underline cursor-pointer" onClick={() => window.open(link.shorturl, "_blank")}>
                  {link.shorturl}
                </p>
                <p className="text-gray-600 text-sm">{link.longurl}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(link.shorturl)}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(link._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllLinks;
