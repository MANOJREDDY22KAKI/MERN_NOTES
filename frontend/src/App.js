import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import CreateNotes from './Pages/CreateNotes';
import EditNote from './Pages/EditNote';
import ShowNote from './Pages/ShowNote';
import DeleteNote from './Pages/DeleteNote';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/create' element = {<CreateNotes />} />
        <Route path='/edit/:id' element = {<EditNote />} />
        <Route path='/show/:id' element = {<ShowNote />} />
        <Route path='/delete/:id' element = {<DeleteNote />} />

      
    </Routes>
    </div>
  );
}

export default App;
