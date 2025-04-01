import axios from "axios";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title , settitle] = useState("");
  const [notedescription , setnotedesciption]= useState("");

  const handleNewNote = async (e) => {
    e.preventDefault();
    if (!title || !notedescription) {
      toast.error("fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/api/notes/add",
        {
          title,
          content: notedescription,
          
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Add the new note to state
        setNotes((prevNotes) => [...prevNotes, response.data.note]);
        toast.success("Task added successfully");
        
        // Clear the form
        settitle("");
        setnotedesciption("");
       
      }
    } catch (err) {
      console.error("Error creating note:", err);
      toast.error("Failed to create note. Please try again.");
    }
  };
  




  // Fetch notes from the server
  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/notes/user-notes",
        { withCredentials: true }
      );
      if (response.data.success) {
        setNotes(response.data.notes); // Assuming response has a 'notes' array
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }, []);

  // Update the status of a note on the server
  const updateStatus = async (noteId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3002/api/notes/status/${noteId}`,
        { noteStatus: newStatus }, // Correcting field name for status
        { withCredentials: true }
      );
      if (response.data.success) {
        // Update local state with the new status
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, noteStatus: newStatus } : note
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Fetch notes initially and set interval for auto-fetch every 5 seconds
  useEffect(() => {
    fetchNotes();
    const interval = setInterval(fetchNotes, 5000);
    return () => clearInterval(interval); // Cleanup interval
  }, [fetchNotes]);

  // Function to get the status class names
  const getStatusClasses = (noteStatus) => {
    switch (noteStatus) {
      case "pending":
        return "text-yellow-600 bg-yellow-200";
      case "in-progress":
        return "text-blue-600 bg-blue-200";
      case "completed":
        return "text-green-600 bg-green-200";
      case "archived":
        return "text-gray-600 bg-gray-200";
      default:
        return "text-yellow-600 bg-yellow-200"; // Default style
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      <ToastContainer autoClose={2000}/>
      <div>
        <form onSubmit={handleNewNote} className="border-2 p-2 border-blue-400 rounded-md">
          <h1>ADD A NEW TASK</h1>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input value={title} type="text" onChange={(e)=>settitle( e.target.value)}/>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Desctiption"> Description </label>
            <textarea name="description" value={notedescription} onChange={(e)=>setnotedesciption(e.target.value)} id="desc"></textarea>
          </div>
          
          <button className="flex items-center justify-center w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 cursor-pointer">Add Task</button>
        </form>
      </div>
      {notes.map((note) => {
        const statusClasses = getStatusClasses(note.noteStatus); // Get the class names based on the note status
        return (
          <div key={note._id} className="flex gap-4 w-full justify-between border-2 p-2 rounded-md">
            <div className="flex-1 flex self-start flex-col">
              <h1 className="text-2xl font-extrabold flex items-center justify-center w-full">{note.title}</h1>
              <p className="text-gray-400 self-start">{note.content}</p>
              {/* Using the fixed status classes */}
              <span className={`self-start ${statusClasses} p-1 rounded`}>
                {note.noteStatus}
              </span>
            </div>
            <span className="flex gap-2 items-center">
              <Trash className="cursor-pointer" />
              <Pencil className="cursor-pointer" />
              <select
                name="status"
                id="status"
                value={note.noteStatus} // Ensure the correct status is selected
                onChange={(e) => {
                  updateStatus(note._id, e.target.value); // Update status both locally and on the server
                }}
              >
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
                <option value="archived">archived</option>
              </select>
            </span>
          </div>
        );
      })}
    </div>
  );
};