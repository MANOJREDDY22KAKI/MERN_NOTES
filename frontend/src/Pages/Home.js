import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsTrash, BsInfoCircle } from 'react-icons/bs';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/notes/");
        setNotes(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Function to format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can adjust the format as per your requirement
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl flex justify-center items-center font-bold mt-6'>Notes</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {notes.map((note) => (
            <div key={note._id} className='bg-gray-700 shadow-md rounded-lg p-4'>
              <div className="flex justify-between flex-row">
                <p className='text-white font-bold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap'>{note.title}</p>

                <div className='flex flex-row justify-between space-x-3'>
                  <Link to={`/edit/${note._id}`}>
                    <BsPencilSquare className='text-white text-xl cursor-pointer hover:text-blue-600' />
                  </Link>
                  <Link to={`/delete/${note._id}`}>
                    <BsTrash className='text-white text-xl cursor-pointer hover:text-blue-600' />
                  </Link>
                  <Link to={`/show/${note._id}`}>
                    <BsInfoCircle className='text-white text-xl cursor-pointer hover:text-blue-600' />
                  </Link>

                </div>
              </div>
              <div className="overflow-y-auto h-40"> {/* Set fixed height */}
                <p className='text-white'>{note.description}</p>
              </div>
              <div className="flex justify-between text-gray-400 text-sm mt-2">
                <p className='text-white font-serif font-semibold'>Created: {formatDate(note.createdAt)}</p>
                <p className=' font-serif font-semibold text-gray-950'>Updated: {formatDate(note.updatedAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

