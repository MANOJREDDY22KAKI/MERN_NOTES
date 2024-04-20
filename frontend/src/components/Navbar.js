import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4 flex flex-row justify-between">
      <div className="text-white text-3xl font-bold mx-24">Notes App</div>
      <div className="flex justify-end space-x-4 mx-24 align-middle">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/create" className="text-white">Create Notes</Link>
        <Link to="/logout" className="text-white">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
