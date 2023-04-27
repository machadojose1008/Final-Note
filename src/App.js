import React, { useState, useEffect } from 'react';
import './App.css';
import { findNotebookPosition } from './helpers';
import { useLocation } from 'react-router-dom'
import SidebarComponent from './components/sidebar/sidebar';
import EditorComponent from './components/editors/editor';
import CardEditorComponent from './components/editors/card-editor';
import { Grid } from '@mui/material';
import { collection, onSnapshot, updateDoc, doc, serverTimestamp, addDoc, deleteDoc, getDocs, query, where, QuerySnapshot } from "firebase/firestore";
import { db } from './utils/firebase/firebase-config.js';

// Required for side-effects
require("firebase/firestore");

function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebookIndex, setSelectedNotebookIndex] = useState(null);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const location = useLocation();


  const findUserIdByEmail = async (email) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let userId = null;
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    return userId;
  };


  /*   const fetchCards = () => {
      const location = 'cards'
      const cardsRef = collection(db, location);
      const unsubscribe = onSnapshot(cardsRef, (serverUpdate) => {
        const cards = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        setCards(cards);
        return () => unsubscribe();
      });
    };
   */


  useEffect(() => {
    setUser(location.state);
    const fetchNotebooks = async (userId) => {
      const notebooksRef = collection(db, `users/${userId}/notebooks`);
      const q = query(notebooksRef);
      const querySnapshot = await getDocs(q);
      const fetchedNotebooks = [];
      querySnapshot.forEach(async (doc) => {
        const notebookId = doc.id;
        const notebookData = doc.data();
        const notesRef = collection(db, `users/${userId}/notebooks/${notebookId}/notes`);
        const notesQuery = query(notesRef);
        const notesQuerySnapshot = await getDocs(notesQuery);
        const fetchedNotes = [];
        notesQuerySnapshot.forEach((noteDoc) => {
          fetchedNotes.push({ id: noteDoc.id, ...noteDoc.data() });
        });
        fetchedNotebooks.push({ id: notebookId, title: notebookData.title, notes: fetchedNotes });
        setNotebooks(fetchedNotebooks);
        setNotes(fetchedNotes);
      });

    };

    const userEmail = location.state.email;
    const fetchUserId = async () => {
      const fetchednUserId = await findUserIdByEmail(userEmail);
      if (fetchednUserId) {
        fetchNotebooks(fetchednUserId);
        setUserId(fetchednUserId);
      }
    };


    fetchUserId();
    console.log(notebooks);
  }, []);


  const selectNote = (note, notebookIndex, noteIndex) => {
    setSelectedNoteIndex(noteIndex);
    setSelectedNote(note);
    setSelectedNotebookIndex(notebookIndex);
  };

  const noteUpdate = (id, selectedNotebookId, noteObj) => {
    const noteRef = doc(db, `users/${userId}/notebooks/${selectedNotebookId}/notes`, id);
    const data = {
      title: noteObj.title,
      body: noteObj.body
    };

    updateDoc(noteRef, data)
      .then((docRef) => {
        console.log('Documento atualizado');
      })
      .catch((error) => {
        console.log(error);
      });
  };





  const newNote = async (noteTitle, notebookTitle) => {
    const note = {
      title: noteTitle,
      body: '',
      timestamp: serverTimestamp(),
    };
    console.log(noteTitle, notebookTitle);

    const findNotebookIndex = async (userId, _title) => {
      const notebookRef = collection(db, 'users', userId, 'notebooks');
      const q = query(notebookRef, where('title', '==', _title));
      console.log(q);
      const querySnapshot = await getDocs(q);
      let notebookId = null;
      querySnapshot.forEach((doc) => {
        notebookId = doc.id;
      });
      console.log(notebookId);
      return notebookId;

    }

    const notebookId = await findNotebookIndex(userId, notebookTitle);
    console.log(notebookId);
    if(!notebookId) {
      console.log('notebook não encontrado');
      return;
    }

    

    const updateNotes = async (newNote) => {
        const notebookPosition = await findNotebookPosition(notebooks, notebookId);
        notebooks[notebookPosition].notes.push(newNote);

    }

    const dbRef = collection(db, `users/${userId}/notebooks/${notebookId}/notes`);

    const newFromDB = await addDoc(dbRef, note);
    const newID = newFromDB.id;

    updateNotes(note);
    
    


    // encontre o índice da nova nota
    //const newNoteIndex = updatedNotes.findIndex((_note) => _note.id === newID);

    // selecione a nova nota automaticamente
    selectNote(notes, newFromDB.id);
    setSelectedNote(note);
    setSelectedNoteIndex(newFromDB.id);
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
    };

    updateDoc(cardRef, data)
      .then((docRef) => {
        console.log('Card atualizado');
      })
      .catch((error) => {
        console.log(error);
      });

  }





  const newCard = async (title) => {
    const card = {
      title: title,
      front: '',
      back: '',
    };

    const cardRef = collection(db, 'cards');

    const newFromDB = await addDoc(cardRef, card);
    const newID = newFromDB.id;
    const updatedCards = [...cards, card];
    setCards(updatedCards);
    const newCardIndex = updatedCards.findIndex((_card) => _card.id === newID);
    selectCard(cards, newFromDB.id);
    setSelectedCard(card);
    setSelectedCardIndex(newCardIndex);
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

    const docRef = doc(db, '/notebooks/48XKBU5WgiJCAaHjWQOI/notes', noteIndex);
    deleteDoc(docRef);
  };

  const deleteCard = async (card) => {
    const cardIndex = card.id;
    await setCards(cards.filter((_card) => _card !== card));
    if (selectedCardIndex === cardIndex) {
      setSelectedCardIndex(null);
      setSelectedCard(null);
    } else {
      cards.length > 1 ?
        selectCard(cards[selectedCardIndex - 1], selectedCardIndex - 1) :
        setSelectedCardIndex(null);
      setSelectedCard(null);
    }

    const cardRef = doc(db, 'cards', cardIndex);
    deleteDoc(cardRef);
  }

  return (
    <div className="app-container">
      {notebooks.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Grid container spacing={2}   >
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
              deleteCard={deleteCard}
              newCard={newCard}
              notebooks={notebooks}
            />
          </Grid>
          <Grid item xs={7}>
            {selectedNote ? (
              <EditorComponent
                selectedNote={selectedNote}
                noteUpdate={noteUpdate}
                selectedNotebookIndex={selectedNotebookIndex}
              />
            ) : null}

          </Grid>
          <Grid item xs={3} >
            {selectedCard ? (
              <CardEditorComponent
                selectedCard={selectedCard}
                cardUpdate={cardUpdate}
              />
            ) : null}
          </Grid>
        </Grid>
      )}
      {/* Spacing é a distância entre os elementos do grid */}
    </div>
  );
};


export default App;
