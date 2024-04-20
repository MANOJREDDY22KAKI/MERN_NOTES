import React from 'react';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner  from '../components/Spinner';
import ReturnButton from '../components/ReturnButton';
const ShowNote = () => {
    const [ notes , setNotes ] = useState({});
    const { id } = useParams();
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsloading(true);
                const response = await axios.get(`http://localhost:5000/notes/${id}`);
                setNotes(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsloading(false);
            }
        };

        fetchNotes();
    },[id])

  return (

    <div className='p-5'>
      <ReturnButton />
      <div className='max-w-md mx-auto mt-5 p-6  rounded-lg shadow-md bg-green-400'>
        <h1 className='mt-6 font-semibold text-2xl text-center mb-5 text-white'>Show Note</h1>
        {isloading ? <Spinner /> : (
            <div>
                <div className='mb-4'>
                    <p className='text-white font-bold text-xl'>Title</p>
                    <p className='text-white'>{notes.title}</p>
                </div>
                <div className='mb-4'>
                    <p className='text-white font-bold text-xl'>Description</p>
                    <p className='text-white'>{notes.description}</p>
                </div>
            </div>

        )}
      </div>
      
    </div>
  );
}

export default ShowNote;
