import React from 'react';
import { useState } from 'react';
import  Spinner  from '../components/Spinner';
import  ReturnButton  from '../components/ReturnButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateNotes = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isloading, setIsloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleCreate = (event) => {
    event.preventDefault();
    const data = {
      title,
      description
    }
    setIsloading(true);
    axios.post("http://localhost:5000/notes",data)
    .then(() => {
      setIsloading(false);
      // setTitle("");
      // setDescription("");
      enqueueSnackbar("Notes Created Successfully", { variant: "success" });
      navigate("/");
    })
    .catch((err)=>{
      setIsloading(false);
      enqueueSnackbar(err.response.data, { variant: "error" });
      console.log(err)
      alert(err.response.data)
      
    })
  }
  return (
    <div className='p-5'>
      <ReturnButton />
    <div className='max-w-md mx-auto mt-5 p-6  rounded-lg shadow-md bg-green-400'>
      <h1 className='mt-6 font-semibold text-2xl text-center mb-5 text-white'>Create Notes</h1>
      {isloading ? <Spinner /> : (
        <form onSubmit={handleCreate}>
          <div className='mb-4'> 
            <input type="text"
              placeholder='ENTER TITLE OF THE NOTE'
              value={title}
              required 
              onChange={(e) => setTitle(e.target.value)} 
              className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
          <textarea cols={"30"} rows={"10"}
            placeholder='ENTER NOTES CONTENT'
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />

          </div>
          <div className='mt-4 flex justify-center'>
            <button
              type='submit'
              className=' bg-blue-500 text-white px-4 py-2 rounded-md focus:border-none hover:bg-blue-600 focus:bg-blue-600'>
                create Notes
              </button>
            </div>
            
        </form>
      )}
    </div>
    </div>
  );
}

export default CreateNotes;
