import Notes from "../models/notesModel.js";
import mongoose from "mongoose";

const getNotes = async (req, res) => {
    try {
        console.log("Fetching all notes...");
        const notes = await Notes.find();
        console.log("Notes fetched:", notes);
        res.json(notes);
        // res.status(200).send('Notes fetched successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

const getNote = async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching note with id:", id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No notes with that id');
        }
        const notes = await Notes.findById(id);
        console.log("Note found:", notes);
        return res.status(200).send(notes);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const createNote = async(req, res) => {
    try {
        console.log("Creating a new note...");
        if (!req.body.title || !req.body.description) {
            return res.status(400).send('Please fill all the fields');
        }
        const notes = await Notes.create(req.body);
        console.log("New note created:", notes);
        return res.status(200).send(notes);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const updateNote = async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Updating note with id:", id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No notes with that id');
        }
        const notes = await Notes.findByIdAndUpdate(id, req.body, { new: true });
        console.log("Updated note:", notes);
        return res.status(200).send(notes);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const deleteNote = async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting note with id:", id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('No notes with that id');
        }
        const notes = await Notes.findByIdAndDelete(id);
        console.log("Note deleted:", notes);
        return res.status(200).send({ message: "Notes deleted successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

export { getNotes, getNote, createNote, updateNote, deleteNote };