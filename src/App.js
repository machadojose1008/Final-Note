import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom'
import SidebarComponent from './components/sidebar/sidebar.component';
import EditorComponent from './components/editor/editor.component';
import { collection, onSnapshot, updateDoc, doc, serverTimestamp, addDoc, deleteDoc } from "firebase/firestore";
import { db } from './utils/firebase/firebase-config.js';

// Required for side-effects
require("firebase/firestore");

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Roda somente quando o progrmaa renderiza a primeira vez
  useEffect(() => {
    const notesRef = collection(db, 'notes');
    const userRef = collection(db, 'users');
    setUser(location.state);

    const unsubscribe = onSnapshot(notesRef, (serverUpdate) => {
      const notes = serverUpdate.docs.map((_doc) => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      setNotes(notes);
  
    });

    return () => unsubscribe();
  }, []);

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const noteUpdate = (id, noteObj) => {
    const noteRef = doc(db, 'notes', id);
    const data = {
      title: noteObj.title,
      body: noteObj.body,
      timestamp: serverTimestamp(),
    };

    updateDoc(noteRef, data)
      .then((docRef) => {
        console.log('Documento atualizado1');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      timestamp: serverTimestamp(),
    };
    const dbRef = collection(db, 'notes');

    const newFromDB = await addDoc(dbRef, note);
    const newID = newFromDB.id;
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(notes.filter((_note) => _note.id === newID)[0]);
    setSelectedNoteIndex(newNoteIndex);
    setSelectedNote(notes[newNoteIndex]);
  };

  const deleteNote = async (note) => {
    const noteIndex = note.id;
    await setNotes(notes.filter((_note) => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1 ?
        selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
        setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    const docRef = doc(db, 'notes', noteIndex);
    deleteDoc(docRef);
  };

  return (
    <div className="app-container">
      <SidebarComponent
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
        user={user}
      />
      {selectedNote ? (
        <EditorComponent
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : null}
    </div>
  );
}

export default App;
