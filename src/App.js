import React, { useState, useEffect } from 'react';
import './App.css';
import { findNotebookPosition, findDeckPosition } from './helpers';
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

  // Notebooks States
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [selectedNotebookIndex, setSelectedNotebookIndex] = useState(null);

  // Notes States
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [notesUpdated, setNotesUpdated] = useState(false);

  // Decks States
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(null);

  // Cards States
  const [cards, setCards] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cardsUpdated, setCardsUpdated] = useState(false);

  // Logged user States
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

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

  const fetchUserId = async () => {
    const userEmail = location.state.email;
    const fetchednUserId = await findUserIdByEmail(userEmail);
    if (fetchednUserId) {
      fetchNotebooks(fetchednUserId);
      fetchDecks(fetchednUserId);
      setUserId(fetchednUserId);
    }
  };

  const selectNote = async (note, notebookIndex, noteIndex) => {
    setSelectedNoteIndex(noteIndex);
    setSelectedNote(note);
    setSelectedNotebookIndex(notebookIndex);
  };

  const noteUpdate = async (id, selectedNotebookId, noteObj) => {
    
    const noteRef = doc(db, `users/${userId}/notebooks/${selectedNotebookId}/notes`, id);
    const data = {
      title: noteObj.title,
      body: noteObj.body
    };

    updateDoc(noteRef, data)
      .then((docRef) => {
        console.log('Documento atualizado');
        setNotesUpdated(true);
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

    const findNotebookIndex = async (userId, _title) => {
      const notebookRef = collection(db, 'users', userId, 'notebooks');
      const q = query(notebookRef, where('title', '==', _title));
      const querySnapshot = await getDocs(q);
      let notebookId = null;
      querySnapshot.forEach((doc) => {
        notebookId = doc.id;
      });
      return notebookId;

    }

    const notebookId = await findNotebookIndex(userId, notebookTitle);
    if (!notebookId) {
      console.log('notebook não encontrado');
      return;
    }



    const updateNotes = async (newNote) => {
      const notebookPosition = await findNotebookPosition(notebooks, notebookId);
      notebooks[notebookPosition].notes.push(newNote);

    } 

    const dbRef = collection(db, `users/${userId}/notebooks/${notebookId}/notes`);

    const newFromDB = await addDoc(dbRef, note);

    updateNotes(note); 
    setNotesUpdated(false);

    selectNote(notes, newFromDB.id);
  };


  const deleteNote = async (note, notebookIndex) => {
    const noteIndex = note.id;
    const noteRef = await doc(db, `users/${userId}/notebooks/${notebookIndex}/notes`, noteIndex);
    deleteDoc(noteRef);

    const notebookPosition = await findNotebookPosition(notebooks, notebookIndex);

    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notebooks[notebookPosition].notes.length > 1 ?
        selectNote(notebooks[notebookPosition].notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
        setSelectedNoteIndex(null);
      setSelectedNote(null);
    }

    setNotebooks(prevState => {
      const updatedNotebooks = [...prevState];
      const updatedNotes = [...updatedNotebooks[notebookPosition].notes];
      updatedNotes.splice(updatedNotes.indexOf(note), 1);
      updatedNotebooks[notebookPosition].notes = updatedNotes;
      return updatedNotebooks;
    });
  };

  const newNotebook = async (notebookTitle) => {
    const _notebook = {
      title: notebookTitle
    }
    const notebookRef = collection(db, `users/${userId}/notebooks`);
    const newNotebook = await addDoc(notebookRef, _notebook );
    setNotesUpdated(true);

  }


  const fetchDecks = async (userId) => {
    const decksRef = collection(db, `users/${userId}/decks`);
    const q = query(decksRef);
    const querySnapshot = await getDocs(q);
    const fetchedDecks = [];
    querySnapshot.forEach(async (doc) => {
      const deckId = doc.id;
      const deckData = doc.data();
      const cardsRef = collection(db, `users/${userId}/decks/${deckId}/cards`);
      const cardsQuery = query(cardsRef);
      const cardsQuerySnapshot = await getDocs(cardsQuery);
      const fetchedCards = [];
      cardsQuerySnapshot.forEach((cardDoc) => {
        fetchedCards.push({ id: cardDoc.id, ...cardDoc.data() });
      });
      fetchedDecks.push({ id: deckId, title: deckData.title, cards: fetchedCards });
      setDecks(fetchedDecks);
      setCards(fetchedCards);
    });
  };

  const selectCard = (card, deckIndex, cardIndex) => {
    setSelectedCardIndex(cardIndex);
    setSelectedCard(card);
    setSelectedDeckIndex(deckIndex);
  }

  const cardUpdate = (id, selectedDeckId, cardObj) => {
    const cardRef = doc(db, `users/${userId}/decks/${selectedDeckId}/cards`, id);
    const data = {
      title: cardObj.title,
      front: cardObj.front,
      back: cardObj.back,
    };

    updateDoc(cardRef, data)
      .then((docRef) => {
        console.log('Card atualizado');
        setCardsUpdated(true);
      })
      .catch((error) => {
        console.log(error);
      });

  }


  const newCard = async (cardTitle, deckTitle) => {
    const card = {
      title: cardTitle,
      front: '',
      back: '',
    };

    const findDeckIndex = async (userId, _title) => {
      const deckRef = collection(db, 'users', userId, 'decks');
      const q = query(deckRef, where('title', '==', _title));
      const querySnapshot = await getDocs(q);
      let deckId = null;
      querySnapshot.forEach((doc) => {
        deckId = doc.id;
      });
      return deckId;
    }

    const deckId = await findDeckIndex(userId, deckTitle);
    if (!deckId) {
      console.log('deck não encontrado');
      return;
    }

    const updateCards = async (newCard) => {
      const deckPosition = await findDeckPosition(decks, deckId);
      decks[deckPosition].cards.push(newCard);
    }

    const cardsRef = collection(db, `users/${userId}/decks/${deckId}/cards`);

    const newFromDB = await addDoc(cardsRef, card);

    updateCards(card);

    selectCard(card, newFromDB.id);
    setSelectedCard(card);
    setSelectedCardIndex(newFromDB.id);
  };


  const deleteCard = async (card, deckIndex) => {
    const cardIndex = card.id;
    const cardRef = await doc(db, `users/${userId}/decks/${deckIndex}/cards`, cardIndex);
    deleteDoc(cardRef);

    const deckPosition = await findDeckPosition(decks, deckIndex);

    if (selectedCardIndex === cardIndex) {
      setSelectedCardIndex(null);
      setSelectedCard(null);
    } else {
      decks[deckPosition].cards.length > 1 ?
        selectCard(decks[deckPosition].cards[selectedCardIndex - 1], selectedCardIndex - 1) :
        setSelectedCardIndex(null);
      setSelectedCard(null);
    }

    setDecks(prevState => {
      const updatedDecks = [...prevState];
      const updatedCards = [...updatedDecks[deckPosition].cards];
      updatedCards.splice(updatedCards.indexOf(card), 1);
      updatedDecks[deckPosition].cards = updatedCards;
      return updatedCards;
    });
  };

  
  const newDeck = async (deckTitle) => {
    const _deck = {
      title: deckTitle
    }
    const deckRef = collection(db, `users/${userId}/decks`);
    const newDeck = await addDoc(deckRef, _deck );
    setNotesUpdated(true);

  }



  useEffect(() => {
    setUser(location.state);
    fetchUserId();

    if(notesUpdated) {
      fetchNotebooks(userId);
      setNotesUpdated(false);
    };

    if(cardsUpdated) {
      fetchDecks(userId);
      setCardsUpdated(false);
    };

  }, [notesUpdated, cardsUpdated, userId]);

  return (
    <div className="app-container">
      {(notebooks.length || decks.length) === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Grid container spacing={2}   >
          <Grid item xs={1.5}>
            <SidebarComponent
              user={user}

              notebooks={notebooks}
              notes={notes}
              newNote={newNote}
              selectNote={selectNote}
              deleteNote={deleteNote}              
              selectedNoteIndex={selectedNoteIndex}
              newNotebook={newNotebook}

              decks={decks}
              cards={cards}
              newCard={newCard}
              selectCard={selectCard}
              deleteCard={deleteCard}              
              selectedCardIndex={selectedCardIndex}
              newDeck={newDeck}

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
                selectedDeckIndex={selectedDeckIndex}
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
