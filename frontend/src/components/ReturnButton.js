import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const ReturnButton = () => {
  return (
    <div className='flex'>

      <Link to="/"
       className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
        <BsArrowLeft  className='text-3xl'/>
      </Link>
      
    </div>
  );
}

export default ReturnButton;
