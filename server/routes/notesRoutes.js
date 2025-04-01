const express = require('express');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const router = express.Router();
const Note = require('../models/notes');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET; // Fixed to use the correct env variable

// Use cookie-parser middleware
router.use(cookieParser());

// Get all notes for the authenticated user
router.get("/user-notes", verifyToken, async (req, res) => {
    try {
        // Get the user ID from the authenticated token
        const userId = req.user.id;
        
        // Find all notes where user_id matches the authenticated user's ID
        // and isDeleted is false (don't show soft-deleted notes)
        const notes = await Note.find({ user_id: userId, isDeleted: false });
        
        // Return the notes
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching user notes:", error);
        res.status(500).json({ success: false, error: "Failed to fetch notes" });
    }
});

// Add a new note
router.post("/add", verifyToken, async (req, res) => {
    try {
        // req.user already contains the decoded token from verifyToken middleware
        const userId = req.user.id; // Use req.user which was set in middleware
        const {title, content} = req.body;
        
        const newNote = new Note({
            title, 
            content, 
            user_id: userId,
            // noteStatus and isDeleted will use the defaults from the schema
        });
        await newNote.save();
        res.json({ success: true, message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ success: false, error: "Failed to add note" });
    }
});

// Edit a note
router.put("/edit/:noteId", verifyToken, async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user.id;
        const { title, content } = req.body;
        
        // Find the note and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id: noteId, user_id: userId, isDeleted: false });
        
        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }
        
        // Update the note
        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();
        
        res.status(200).json({ success: true, message: "Note updated successfully", note });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, error: "Failed to update note" });
    }
});

// Update note status
router.put("/status/:noteId", verifyToken, async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user.id;
        const { noteStatus } = req.body;

        // Validate status
        const validStatuses = ["pending", "in-progress", "completed", "archived"];
        if (!validStatuses.includes(noteStatus)) {
            return res.status(400).json({
                success: false,
                error: "Invalid status. Must be one of: pending, in-progress, completed, archived"
            });
        }

        // Find the note and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id: noteId, user_id: userId, isDeleted: false });

        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }

        // Update the status
        note.noteStatus = noteStatus;
        await note.save();

        res.status(200).json({ success: true, message: "Note status updated successfully", note });

    } catch (error) {
        console.error("Error updating note status:", error);
        res.status(500).json({ success: false, error: "Failed to update note status" });
    }
});


// Soft delete a note
router.delete("/delete/:noteId", verifyToken, async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user.id;
        
        // Find the note and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id: noteId, user_id: userId, isDeleted: false });
        
        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }
        
        // Soft delete by setting isDeleted to true
        note.isDeleted = true;
        await note.save();
        
        res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ success: false, error: "Failed to delete note" });
    }
});

// Update note status
router.put("/status/:noteId", verifyToken, async (req, res) => {
    try {
        const { noteId } = req.params;
        const userId = req.user.id;
        const { noteStatus } = req.body;
        
        // Validate status
        const validStatuses = ["pending", "in-progress", "completed", "archived"];
        if (!validStatuses.includes(noteStatus)) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid status. Must be one of: pending, in-progress, completed, archived" 
            });
        }
        
        // Find the note and ensure it belongs to the authenticated user
        const note = await Note.findOne({ _id: noteId, user_id: userId, isDeleted: false });
        
        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }
        
        // Update the status
        note.noteStatus = noteStatus;
        await note.save();
        
        res.status(200).json({ success: true, message: "Note status updated successfully", note });
    } catch (error) {
        console.error("Error updating note status:", error);
        res.status(500).json({ success: false, error: "Failed to update note status" });
    }
});

// Get all notes by status
router.get("/by-status/:noteStatus", verifyToken, async (req, res) => {
    try {
        const { noteStatus } = req.params;
        const userId = req.user.id;
        
        // Validate status
        const validStatuses = ["pending", "in-progress", "completed", "archived"];
        if (!validStatuses.includes(noteStatus)) {
            return res.status(400).json({ 
                success: false, 
                error: "Invalid status. Must be one of: pending, in-progress, completed, archived" 
            });
        }
        
        // Find all notes with the specified status for this user
        const notes = await Note.find({ 
            user_id: userId, 
            noteStatus: noteStatus,
            isDeleted: false
        });
        
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching notes by status:", error);
        res.status(500).json({ success: false, error: "Failed to fetch notes by status" });
    }
});

module.exports = router;