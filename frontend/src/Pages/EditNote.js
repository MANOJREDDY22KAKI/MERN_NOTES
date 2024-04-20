import React from 'react';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import Spinner  from '../components/Spinner';
import ReturnButton from '../components/ReturnButton';

const EditNote = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isloading, setIsloading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setIsloading(true);
                const response = await axios.get(`http://localhost:5000/notes/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (err) {
                console.log(err);
            } finally {
                setIsloading(false);
            }
        };

        fetchNotes();
    }, [id]);

    const handleEdit = (e) =>{
        e.preventDefault();
        const data = {
            title,
            description
        }
        setIsloading(true);
        axios.put(`http://localhost:5000/notes/${id}`,data)
        .then(() => {
            setIsloading(false);
            enqueueSnackbar("Notes Updated Successfully", { variant: "success" });
            navigate("/");
        })

        .catch((err)=>{
            setIsloading(false);
            enqueueSnackbar(err.response.data, { variant: "error" });
            console.log(err)
        })
    }
    return (
        <div className='p-5'>
          <ReturnButton />
        <div className='max-w-md mx-auto mt-5 p-6  rounded-lg shadow-md bg-green-400'>
          <h1 className='mt-6 font-semibold text-2xl text-center mb-5 text-white'>Create Notes</h1>
          {isloading ? <Spinner /> : (
            <form onSubmit={handleEdit}>
              <div className='mb-4'> 
                <input type="text"
                  
                  value={title}
                  required 
                  onChange={(e) => setTitle(e.target.value)} 
                  className='block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
              </div>
              <div className='mb-4'>
              <textarea cols={"30"} rows={"10"}
                
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
                    Edit Notes
                  </button>
                </div>
                
            </form>
          )}
        </div>
        </div>
      );
}

export default EditNote;
