import React, { useState, useContext, useEffect, useRef } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;

  useEffect(() => {
    getAllNotes();
  }, []);
  
  const [currentNote, setCurrentNote] = useState({ title: "", description: "", tag: "" });
  const ref = useRef(null);

  // Function to open the modal with the note's current details
  const updateNote = (note) => {
    setCurrentNote({title:currentNote.title , description: currentNote.description, tag: currentNote.tag});
    ref.current.click(); // Programmatically click the hidden button to open the modal
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Call the update function from context here
    // For example: updateNoteInContext(currentNote._id, currentNote.title, currentNote.description, currentNote.tag);
  };

  return (
    <>
      <AddNote/> 
      
      {/* Hidden button used to trigger the modal */}
      <button className="btn btn-primary d-none" type="button" data-bs-toggle="modal" data-bs-target="#updateNoteModal" ref={ref}>
        Open Modal
      </button>
      
      {/* Modal for updating the note */}
      <div className="modal fade" id="updateNoteModal" tabIndex="-1" aria-labelledby="updateNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateNoteModalLabel">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-4'>
                <div className="form-group">
                  <label htmlFor="updateNoteTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateNoteTitle"
                    name="title"
                    value={currentNote.title}
                    onChange={onChange}
                    placeholder="Enter title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="updateNoteDescription">Description</label>
                  <textarea
                    className="form-control"
                    id="updateNoteDescription"
                    name="description"
                    value={currentNote.description}
                    onChange={onChange}
                    placeholder="Enter description"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="updateNoteTag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateNoteTag"
                    name="tag"
                    value={currentNote.tag}
                    onChange={onChange}
                    placeholder="Enter tag"
                  />
                </div>

                <button type="submit" onClick={handleClick} className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <h3>Your Notes</h3>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}

export default Notes;
