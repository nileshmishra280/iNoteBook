import React, { useState, useContext, useEffect, useRef } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';


const Notes = () => {
  const context = useContext(noteContext);
  const { notes,editNote,getAllNotes } = context;

  useEffect(() => {
    getAllNotes();
  }, [])
  
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "" });


  // Function to open the modal with the note's current details
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
}


  const handleClick = (e) => {
       editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

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
                    value={note.etitle}
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
                    value={note.edescription}
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
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Enter tag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
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
