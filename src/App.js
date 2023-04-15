import React, { useState, useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom'
import SidebarComponent from './components/sidebar.component';
import EditorComponent from './components/editor.component';
import { Grid } from '@mui/material';
import { collection, onSnapshot, updateDoc, doc, serverTimestamp, addDoc, deleteDoc } from "firebase/firestore";
import { db, getCardsFromFirestore } from './utils/firebase/firebase-config.js';

// Required for side-effects
require("firebase/firestore");

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Roda somente quando o progrmaa renderiza a primeira vez
  useEffect(() => {
    const notesRef = collection(db, 'notes');
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
  
  useEffect(() => {
    const cardsRef = collection(db, 'cards');
    const unsubscribe = onSnapshot(cardsRef, (serverUpdate) => {
      const cards = serverUpdate.docs.map((_doc) => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      setCards(cards);

    });

    return () => unsubscribe();


  }, []);

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };

  const selectCard = (card, index) => {
    setSelectedCard(card);
    setSelectedCardIndex(index);
  }


  const cardUpdate = (id, cardObj) => {
    const cardRef = doc(db, 'cards', id);
    const data = {
      title: cardObj.title,
      front: cardObj.front,
      back: cardObj.back,
      timestamp: serverTimestamp()
    };

    updateDoc(cardRef, data)
      .then((docRef) => {
        console.log('Card atualizado');
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const noteUpdate = (id, noteObj) => {
    const noteRef = doc(db, 'notes', id);
    const data = {
      title: noteObj.title,
      body: noteObj.body,
      timestamp: serverTimestamp(),
    };

    updateDoc(noteRef, data)
      .then((docRef) => {
        console.log('Documento atualizado');
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
      {/* Spacing é a distância entre os elementos do grid */}
      <Grid container spacing={2}>
        <Grid item xs={1.5}>
          <SidebarComponent
            selectedNoteIndex={selectedNoteIndex}
            selectedCardIndex={selectedCardIndex}
            notes={notes}
            deleteNote={deleteNote}
            selectNote={selectNote}
            newNote={newNote}
            cards={cards}
            selectCard={selectCard}
            user={user}
          />
        </Grid>
        <Grid item xs={10}>
          {selectedNote ? (
            <EditorComponent
              selectedNote={selectedNote}
              selectedNoteIndex={selectedNoteIndex}
              notes={notes}
              noteUpdate={noteUpdate}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
