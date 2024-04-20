import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center w-full top-0 left-0 h-full fixed'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      
    </div>
  );
}

export default Spinner;
