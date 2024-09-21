import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import './App.css';
import NoteState from './context/notes/NoteState'; 
import Alert from './component/Alert';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
