import React, { useState, useEffect } from 'react';
import './App.css';
import { findNotebookPosition, findDeckPosition } from './helpers';
import { useLocation } from 'react-router-dom';
import SidebarComponent from './components/sidebar/sidebar';
import EditorComponent from './components/editors/editor';
import CardEditorComponent from './components/editors/card-editor';
import { Grid } from '@mui/material';
import { collection, updateDoc, doc, serverTimestamp, addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from './utils/firebase/firebase-config.js';
import SrsComponent from './components/srs/srs';

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
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cardsUpdated, setCardsUpdated] = useState(false);

  // Logged user States
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const location = useLocation();

  // Display setters
  const [showCard, setShowCard] = useState(null);
  const [showNote, setShowNote] = useState(null);
  const [showStudy, setShowStudy] = useState(null);


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
    setShowNote(true);
    setShowStudy(false);
  };

  const noteUpdate = async (id, selectedNotebookId, noteObj) => {

    const noteRef = doc(db, `users/${userId}/notebooks/${selectedNotebookId}/notes`, id);
    const data = {
      title: noteObj.title,
      body: noteObj.body
    };

    updateDoc(noteRef, data)
      .then((docRef) => {
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
    const noteRef =  doc(db, `users/${userId}/notebooks/${notebookIndex}/notes`, note.id);
    await deleteDoc(noteRef);

    const notebookPosition = await findNotebookPosition(notebooks, notebookIndex);

    if (selectedNoteIndex === note.id) {
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
    const newNotebook = await addDoc(notebookRef, _notebook);
    setNotesUpdated(true);

  };

  const renameNotebook = async (notebookId, newTitle) => {
    const data = {
      title: newTitle
    }
    const notebookRef = doc(db, `users/${userId}/notebooks`,notebookId);

    updateDoc(notebookRef, data)
      .then(notebookRef => {
        setNotesUpdated(true);// atualiza o sidebar com os novos valores
      })
      .catch(error => {
        console.log(error);
      })

  };

  const deleteNotebook = async (notebookId) => {
    const notebookRef = doc(db, `users/${userId}/notebooks`, notebookId);
    const notebookPosition = await findNotebookPosition(notebooks, notebookId);
    const notebookNotes = notebooks[notebookPosition].notes;

     for (const note of notebookNotes){
        await deleteNote(note, notebookId);
    }

    await deleteDoc(notebookRef)
    .then(docRef => {
      setNotesUpdated(true);
    })
    .catch(error => {
      console.log(error);
    })  

  };

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
    setShowCard(true);
    setShowStudy(false);
  };

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

  };


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
    setCardsUpdated(false);

    selectCard(card, newFromDB.id);
  };


  const deleteCard = async (card, deckIndex) => {
    const cardRef =  doc(db, `users/${userId}/decks/${deckIndex}/cards`, card.id);
    await deleteDoc(cardRef);

    const deckPosition = await findDeckPosition(decks, deckIndex);

    if (selectedCardIndex === card.id) {
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
    await addDoc(deckRef, _deck);
    setNotesUpdated(true);

  };

  const renameDeck = async (deckId, newTitle) => {
    const data = {
      title: newTitle
    }
    const deckRef = doc(db, `users/${userId}/decks`,deckId);

    updateDoc(deckRef, data)
      .then(deckRef => {
        setNotesUpdated(true); // atualiza o sidebar com os novos valores
      })
      .catch(error => {
        console.log(error);
      })


  }

  
  const deleteDeck = async (deckId) => {
    const deckRef = doc(db, `users/${userId}/decks`, deckId);
    const deckPosition = await findDeckPosition(decks, deckId);
    const deckCards= decks[deckPosition].cards;

    for (const card of deckCards){
        await deleteCard(card, deckId);
    }

    await deleteDoc(deckRef)
    .then(docRef => {
      setCardsUpdated(true);
    })
    .catch(error => {
      console.log(error);
    })

  }


  const updateAfterReview = async (decks) => {
    for (const _deck of decks) {
      for (const _card of _deck.cards) {
        const deckRef = doc(db, `users/${userId}/decks/${_deck.id}/cards`, _card.id);

        updateDoc(deckRef, _card)
          .then(docRef => {
            console.log('Documento Adiconado com sucesso');
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }

  const closeCard = () => {
    setShowCard(!showCard);
  }

  const closeNote = () => {
    setShowNote(!showNote);
  }

  const selectStudy = () => {
    setShowCard(false);
    setShowNote(false);
    setShowStudy(true);
  }


  useEffect(() => {
    setUser(location.state);
    fetchUserId();

    if (notesUpdated) {
      fetchNotebooks(userId);
      setNotesUpdated(false);
    };

    if (cardsUpdated) {
      fetchDecks(userId);
      setCardsUpdated(false);
    };

  }, [notesUpdated, cardsUpdated, userId]);

  return (
    <div className="app-container">
      {(notebooks.length || decks.length) === 0 ? (
        <p></p>
      ) : (
        /* Spacing é a distância entre os elementos do grid */
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
              renameNotebook={renameNotebook}
              deleteNotebook={deleteNotebook}

              decks={decks}
              cards={cards}
              newCard={newCard}
              selectCard={selectCard}
              deleteCard={deleteCard}
              selectedCardIndex={selectedCardIndex}
              newDeck={newDeck}
              renameDeck={renameDeck}
              deleteDeck={deleteDeck}

              selectStudy={selectStudy}

            />
          </Grid>
          {(selectedNote && showNote) ? (
            <Grid item xs={(showCard) ? 7 : 10}>
              <EditorComponent
                selectedNote={selectedNote}
                noteUpdate={noteUpdate}
                selectedNotebookIndex={selectedNotebookIndex}
                closeNote={closeNote}
              />
            </Grid>
          ) : null}
          {(showStudy) ? (
            <Grid item xs={10.2} sx={{ marginRight: '30px' }}>
              <SrsComponent
                decks={decks}
                userId={userId}
                updateAfterReview={updateAfterReview}
              />
            </Grid>
          ) : null}
          {(selectedCard && showCard) ? (

            <Grid item xs={(showNote) ? 3 : 7} >

              <CardEditorComponent
                selectedCard={selectedCard}
                cardUpdate={cardUpdate}
                selectedDeckIndex={selectedDeckIndex}
                closeCard={closeCard}
              />
            </Grid>
          ) : null}

        </Grid>
      )}

    </div>
  );
};


export default App;
