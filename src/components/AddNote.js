import React, { useState, useContext } from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    
    const handleClick = (e) => {
        e.preventDefault();
        // if (note.title.trim() === "" || note.description.trim() === "") {
        //     alert("Title and Description cannot be empty!");
        //     return;
        // }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (
        <div>
            <form className='my-4'>
                <h3>ADD YOUR NOTES</h3>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        placeholder="Enter title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        placeholder="Enter description"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        placeholder="Enter tag"
                    />
                </div>

                <button type="submit" onClick={handleClick} className="btn btn-primary">
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
