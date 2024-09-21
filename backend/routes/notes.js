const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route 2: Create new notes using: POST "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            user: req.user.id,
            title,
            description,
            tag
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error('Error saving notes:', error);
        res.status(500).json({ error: 'An error occurred while saving the notes' });
    }
});

// Route 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a new note object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found"); }

        // Allow only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to update");
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
});

// Route 4: delete an existing note using: DELETE "/api/notes/deletenote/:id". Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deteled and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found"); }

        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed to update");
        }

        // Update the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"mesege":"Note has bee deleted",note:note});
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'An error occurred while updating the note' });
    }
});

module.exports = router;