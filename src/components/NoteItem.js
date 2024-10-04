import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import './NoteItem.css'; // Make sure to import the CSS file

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="note-item-container">
            <div className="note-card">
                <div className="note-actions">
                    <button 
                        className="note-action-button edit-button"
                        onClick={() => updateNote(note)}
                        aria-label="Edit note"
                    >
                        <i className="fa fa-edit"></i>
                    </button>
                    <button 
                        className="note-action-button delete-button"
                        onClick={() => deleteNote(note._id)}
                        aria-label="Delete note"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
                <div className="note-content">
                    <h5 className="note-title">{note.title}</h5>
                    <p className="note-description">{note.description}</p>
                </div>
                <div className="gradient-line"></div>
            </div>
        </div>
    );
}

export default NoteItem;