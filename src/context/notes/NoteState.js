import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = `http://localhost:4000`; 


  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTI1YTM5NTAzZGY1NzgwZjhmNWM5In0sImlhdCI6MTcyNjAzMTI2N30.DApKF2J3CWBJ2XjDr0FGtAmTBt8qOkP-4qVdnwvv4L4" // Replace with actual token or pass it dynamically
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTI1YTM5NTAzZGY1NzgwZjhmNWM5In0sImlhdCI6MTcyNjAzMTI2N30.DApKF2J3CWBJ2XjDr0FGtAmTBt8qOkP-4qVdnwvv4L4" // Replace with actual token
      },
    });
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTI1YTM5NTAzZGY1NzgwZjhmNWM5In0sImlhdCI6MTcyNjAzMTI2N30.DApKF2J3CWBJ2XjDr0FGtAmTBt8qOkP-4qVdnwvv4L4" // Replace with actual token
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const updatedNote = await response.json();
    const newNotes = notes.map((note) =>
      note._id === id ? updatedNote : note
    );
    setNotes(newNotes);
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTI1YTM5NTAzZGY1NzgwZjhmNWM5In0sImlhdCI6MTcyNjAzMTI2N30.DApKF2J3CWBJ2XjDr0FGtAmTBt8qOkP-4qVdnwvv4L4" // Replace with your actual token
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setNotes(json);
    } catch (error) {
        console.error('Failed to fetch:', error);
    }
};


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
