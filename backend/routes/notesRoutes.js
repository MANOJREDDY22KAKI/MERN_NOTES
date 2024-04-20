import express from "express";
import Notes from "../models/notesModel.js";
import mongoose from "mongoose";
import {getNotes,getNote,createNote,updateNote,deleteNote} from "../controllers/notesController.js";

const router = express.Router();

// Reading all the notes in the database
router.get('/', getNotes);

// Reading a single note based on id
router.get('/:id', getNote);

// Creating a new note
router.post('/', createNote);

// Updating a note based on id
router.put('/:id', updateNote);

// Deleting a note based on id
router.delete('/:id', deleteNote);

export default router;
