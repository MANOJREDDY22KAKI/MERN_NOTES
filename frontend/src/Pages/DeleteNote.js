import React from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useParams, useNavigate } from 'react-router-dom';

import ReturnButton from '../components/ReturnButton';

const DeleteNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/notes/${id}`)
            .then(() => {
                enqueueSnackbar("Note deleted successfully", { variant: "success" });
                navigate("/");
            })
            .catch((err) => {
                enqueueSnackbar("Failed to delete note", { variant: "error" });
                console.error("Failed to delete note:", err);
            });
    };

    return (
        <div className='p-5'>
            <ReturnButton />
            <h1 className='font-semibold text-2xl text-center'>Delete Note</h1>
            <div className='max-w-md mx-auto mt-5 p-6 rounded-lg shadow-md flex flex-col items-center'>
                <p>Are you sure you want to delete this note?</p>
                <button
                    className='bg-red-500 text-white font-bold py-2 px-4 rounded mt-6'
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteNote;
