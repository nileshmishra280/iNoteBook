import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                        {note.title}
                        <div>
                            <i
                                className="fa fa-edit text-primary mx-2"
                                onClick={() => { updateNote(note); }} // Ensure updateNote is called with the note object
                                aria-hidden="true"
                                title="Edit"
                            ></i>
                            <i
                                className="fa fa-trash text-danger"
                                onClick={() => { deleteNote(note._id); }} // Ensure deleteNote is called with note._id
                                aria-hidden="true"
                                title="Delete"
                            ></i>
                        </div>
                    </h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
