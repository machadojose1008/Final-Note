import React, { useState, useEffect } from 'react';
import './App.css';
import { findNotebookPosition, findDeckPosition } from '../src/utils/helpers/helpers';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarComponent from './components/sidebar/sidebar';
import EditorComponent from './components/editors/editor';
import CardEditorComponent from './components/editors/card-editor';
import { Grid } from '@mui/material';
import { collection, updateDoc, doc, serverTimestamp, addDoc, deleteDoc, getDocs, query, where, Timestamp, getDoc } from "firebase/firestore";
import { db } from './utils/firebase/firebase-config.js';
import SrsComponent from './components/srs/srs';
import SharedNoteEditor from './components/editors/sharedNoteEditor';
import ChatComponent from './components/chat/chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase/firebase-config.js';
import { redirect } from 'react-router-dom';

// Required for side-effects
require("firebase/firestore");




function App() {

  const navigate = useNavigate();
  // Notebooks States
  const [notebooks, setNotebooks] = useState([]);
  const [selectedNotebookIndex, setSelectedNotebookIndex] = useState(null);

  // Notes States
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [notesUpdated, setNotesUpdated] = useState(false);

  // Shared Note States
  const [sharedNotes, setSharedNotes] = useState([]);
  const [selectedSharedNote, setSelectedSharedNote] = useState(null);
  const [selectedSharedNoteIndex, setSelectedSharedNoteIndex] = useState(null);
  const [sharedNotesUpdated, setSharedNotesUpdated] = useState(false);
  const [isSharedNoteOpened, setIsSharedNoteOpened] = useState(false);

  // Decks States
  const [decks, setDecks] = useState([]);
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(null);

  // Cards States
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [cardsUpdated, setCardsUpdated] = useState(false);

  // Logged user States
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  // Display setters
  const [showCard, setShowCard] = useState(null);
  const [showNote, setShowNote] = useState(null);
  const [showStudy, setShowStudy] = useState(null);
  const [showSharedNotes, setShowSharedNotes] = useState(false);
  const [showChat, setShowChat] = useState(false);



  const findUserIdByEmail = async (email) => {
    // Função auxiliar para pegar o userId com um email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let userId = null;
    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });
    return userId;
  };


  const fetchUserId = async () => {
    // Buscar Material do usuário logado antes de carregar a página
    const userEmail = user.user.email;
    const fetchednUserId = await findUserIdByEmail(userEmail);
    if (fetchednUserId) {
      fetchNotebooks(fetchednUserId);
      fetchDecks(fetchednUserId);
      setUserId(fetchednUserId);
      fetchUsername(fetchednUserId);
    }
  };

  const fetchUsername = async (userId) => {
    // Pega o nome de usuário do email logado
    const ref = doc(db, `users`, userId);
    const user = await getDoc(ref);
    setUsername(user.data().displayName);

  }


  const fetchNotebooks = async (userId) => {
    // Busca os notebooks do usuário logado e carrega no notebooks

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
    });

    fetchSharedNotes(user.user.email);

  };

  const fetchDecks = async (userId) => {
    // Busca os decks do usuário logado e carrega em decks.


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
    });
  };


  const fetchSharedNotes = async (email) => {
    // Busca no sharedNotes as notas que possuem o usuário atual como dono  e carrega no sharedNotes

    const sharedNotesRef = collection(db, 'sharedNotes');
    const q = query(sharedNotesRef);
    const querySnapshot = await getDocs(q);
    const fetchedSharedNotes = [];

    querySnapshot.forEach((doc) => {
      const sharedNoteData = doc.data();
      const sharedNoteEmails = sharedNoteData.email;
      if (sharedNoteEmails.includes(email)) {
        fetchedSharedNotes.push({ id: doc.id, ...sharedNoteData });
      }
    });

    setSharedNotes(fetchedSharedNotes);
  };


  const selectNote = async (note, noteIndex, notebookIndex) => {
    setSelectedNoteIndex(noteIndex);
    setSelectedNote(note);
    setSelectedNotebookIndex(notebookIndex);
    setShowNote(true);
    setShowStudy(false);
    closeSharedNote();


  };

  const checkOpenned = async (index) => {
    const docRef = doc(db, 'sharedNotes', index);
    const data = await getDoc(docRef);
    return (data.data().openned);
  }

  const selectSharedNote = async (sharedNote, sharedNoteIndex) => {
    const opennedState = await checkOpenned(sharedNoteIndex);

    if (opennedState === false) {
      if (selectedSharedNoteIndex !== null) {
        const ref = doc(db, 'sharedNotes', selectedSharedNoteIndex);
        await updateDoc(ref, { openned: false });
      }

      setSelectedSharedNote(sharedNote);
      setSelectedSharedNoteIndex(sharedNoteIndex);
      setShowSharedNotes(true);
      setShowNote(false);
      setShowStudy(false);
      const dbRef = doc(db, 'sharedNotes', sharedNoteIndex);

      try {
        await updateDoc(dbRef, { openned: true });
      } catch (err) {
        console.error(err);
      }

    } else {
      alert('Nota aberta por outro usuário');
    }

  };

  const noteUpdate = async (id, selectedNotebookId, noteObj) => {
    if (noteObj.body === '<p><br></p>') {
      return;
    } else {
      const noteRef = doc(db, `users/${userId}/notebooks/${selectedNotebookId}/notes`, id);
      const data = {
        title: noteObj.title,
        body: noteObj.body,
        timestamp: serverTimestamp()
      };

      updateDoc(noteRef, data)
        .then((docRef) => {
          setNotesUpdated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }


  };


  const sharedNoteUpdate = async (id, sharedNoteObj) => {

    if (sharedNoteObj.body === '<p><br></p>') {
      return;
    } else {
      const sharedNoteRef = doc(db, 'sharedNotes', id);
      const data = {
        title: sharedNoteObj.title,
        body: sharedNoteObj.body,
        timestamp: serverTimestamp()
      };

      updateDoc(sharedNoteRef, data)
        .then((docRef) => {
          setSharedNotesUpdated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };

  const newNote = async (noteTitle, notebookTitle) => {
    selectNote(null, null, null);

    const note = {
      title: noteTitle,
      body: '',
      timestamp: Timestamp.fromDate(new Date()),
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

    const dbRef = collection(db, `users/${userId}/notebooks/${notebookId}/notes`);

    const newFromDB = await addDoc(dbRef, note);

    const newNote = await {
      title: note.title,
      body: note.body,
      timestamp: note.timestamp,
      id: newFromDB.id
    };

    setNotesUpdated(true);
    await selectNote(newNote, newFromDB.id, notebookId);

  };


  const deleteNote = async (note, notebookIndex) => {
    const noteRef = doc(db, `users/${userId}/notebooks/${notebookIndex}/notes`, note.id);
    await deleteDoc(noteRef);


    const notebookPosition = await findNotebookPosition(notebooks, notebookIndex);


    if (selectedNoteIndex === note.id) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notebooks[notebookPosition].notes.length > 1 ?
        selectNote(notebooks[notebookPosition].notes[selectedNoteIndex - 1], selectedNoteIndex - 1, notebookIndex) :
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

  const shareNote = async (noteObj, timestamp, emailDestiny, selectedNotebookIndex) => {
    const note = {
      email: [user.user.email, emailDestiny],
      title: noteObj.title,
      body: noteObj.body,
      timestamp: timestamp,
      openned: false
    };

    const userDestiny = await findUserIdByEmail(emailDestiny);

    if (userDestiny === userId) {
      alert('Não é possível compartilhar notas com o usuário atual');
      return;
    }

    if (userDestiny === null) {
      alert('Email não encontrado');
      return;
    }
    else {

      const newNoteRef = collection(db, 'sharedNotes');
      const newFromDB = await addDoc(newNoteRef, note);
      setSharedNotesUpdated(true);

      const newNote = {
        title: note.title,
        body: note.body,
        timestamp: note.timestamp,
        id: newFromDB.id
      };

      await selectSharedNote(newNote, newFromDB.id);
      const removeRef = doc(db, `users/${userId}/notebooks/${selectedNotebookIndex}/notes`, noteObj.id);
      await deleteDoc(removeRef);

      setNotesUpdated(true);
      alert('Nota compartilhada com sucesso');
    }


  };

  const deleteSharedNote = async (sharedNote) => {
    const removeRef = doc(db, 'sharedNotes', sharedNote.id);
    await deleteDoc(removeRef);

    if (selectedSharedNoteIndex === shareNote.id) {
      setSelectedSharedNoteIndex(null);
      setSelectedSharedNote(null);
      setIsSharedNoteOpened(false);
    }

    setSharedNotesUpdated(true);
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
    const notebookRef = doc(db, `users/${userId}/notebooks`, notebookId);

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

    if (notebooks.length === 1) {
      alert('Você deve ter ao menos um caderno!');

    } else {
      for (const note of notebookNotes) {

        await deleteNote(note, notebookId);
      }

      await deleteDoc(notebookRef)
        .then(docRef => {
          setNotesUpdated(true);
        })
        .catch(error => {
          console.log(error);
        })

    }

  };


  const selectCard = async (card, cardIndex, deckIndex) => {
    setSelectedCardIndex(cardIndex);
    setSelectedCard(card);
    setSelectedDeckIndex(deckIndex);
    setShowCard(true);
    setShowStudy(false);
  };

  const cardUpdate = (id, selectedDeckId, cardObj) => {
    if (cardObj.front === '<p><br></p>' || cardObj.back === '<p><br></p>') {
      return;
    } else {
      const cardRef = doc(db, `users/${userId}/decks/${selectedDeckId}/cards`, id);
      const data = {
        title: cardObj.title,
        front: cardObj.front,
        back: cardObj.back,
      };

      updateDoc(cardRef, data)
        .then((docRef) => {
          setCardsUpdated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }


  };


  const newCard = async (cardTitle, deckTitle) => {
    selectCard(null, null, null);

    const card = {
      title: cardTitle,
      front: '',
      back: '',
      ease: 1,
      reviewDate: serverTimestamp(),
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
      
      return;
    }


    const cardsRef = collection(db, `users/${userId}/decks/${deckId}/cards`);

    const newFromDB = await addDoc(cardsRef, card);

    const newCard = await {
      title: card.title,
      front: card.front,
      back: card.back,
      id: newFromDB.id
    };

    setCardsUpdated(true);

    await selectCard(newCard, newFromDB.id, deckId);
  };


  const deleteCard = async (card, deckIndex) => {
    const cardRef = doc(db, `users/${userId}/decks/${deckIndex}/cards`, card.id);
    await deleteDoc(cardRef);

    const deckPosition = await findDeckPosition(decks, deckIndex);

    if (selectedCardIndex === card.id) {
      setSelectedCardIndex(null);
      setSelectedCard(null);
    } else {
      decks[deckPosition].cards.length > 1 ?
        selectCard(decks[deckPosition].cards[selectedCardIndex - 1], selectedCardIndex - 1, deckIndex) :
        setSelectedCardIndex(null);
      setSelectedCard(null);
    }

    setDecks(prevState => {
      const updatedDecks = [...prevState];
      const updatedCards = [...updatedDecks[deckPosition].cards];
      updatedCards.splice(updatedCards.indexOf(card), 1);
      updatedDecks[deckPosition].cards = updatedCards;
      return updatedDecks;
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
    const deckRef = doc(db, `users/${userId}/decks`, deckId);

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
    const deckCards = decks[deckPosition].cards;

    if (decks.length === 1) {
      alert('Você deve ter ao menos um deck!');
    } else {

      for (const card of deckCards) {
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


  }


  const updateAfterReview = async (decks) => {
    for (const _deck of decks) {
      for (const _card of _deck.cards) {
        const deckRef = doc(db, `users/${userId}/decks/${_deck.id}/cards`, _card.id);

        updateDoc(deckRef, _card)
          .then(docRef => {

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
  };

  const closeChat = () => {
    setShowChat(!showChat);
  }

  const logOut = () => {
    auth.signOut();
    return navigate('/signin')
  }

  const closeSharedNote = async () => {
    if (selectedSharedNoteIndex !== null) {
      const dbRef = doc(db, 'sharedNotes', selectedSharedNoteIndex);
      try {
        await updateDoc(dbRef, { openned: false });
      } catch (err) {
        console.error(err);
      }
      setShowSharedNotes(false);
      setSharedNotesUpdated(true);
    }

  }

  const selectStudy = () => {
    setShowCard(false);
    setShowNote(false);
    setShowStudy(true);
    closeSharedNote();
  }

  const selectGroup = () => {
    setShowCard(false);
    setShowNote(false);
    setShowStudy(false);
  };

  const selectChat = () => {
    setShowChat(!showChat);
    setShowCard(false);
  }

  const selectSharedNotesEditor = () => {
    setShowNote(false);
    setShowStudy(false);
    setShowSharedNotes(true);
  }

  useEffect(() => {
    // Atualize o local storage sempre que o usuário mudar
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);




  useEffect(() => {

    fetchUserId();

    if (notesUpdated) {
      fetchNotebooks(userId);
      setNotesUpdated(false);
    };

    if (cardsUpdated) {
      fetchDecks(userId);
      setCardsUpdated(false);
    };

    if (sharedNotesUpdated) {
      fetchSharedNotes(userId);
      setSharedNotesUpdated(false);
    }

  }, [notesUpdated, cardsUpdated, userId, sharedNotesUpdated]);

  return (
    <div className="app-container">
      {notebooks.length > 0 && decks.length > 0 ? (
        <Grid container spacing={2}   >
          <Grid item xs={1.5}>
            <SidebarComponent
              user={user}
              username={username}
              logOut={logOut}

              notebooks={notebooks}
              newNote={newNote}
              selectNote={selectNote}
              deleteNote={deleteNote}
              selectedNoteIndex={selectedNoteIndex}
              newNotebook={newNotebook}
              renameNotebook={renameNotebook}
              deleteNotebook={deleteNotebook}

              decks={decks}
              newCard={newCard}
              selectCard={selectCard}
              deleteCard={deleteCard}
              selectedCardIndex={selectedCardIndex}
              newDeck={newDeck}
              renameDeck={renameDeck}
              deleteDeck={deleteDeck}

              sharedNotes={sharedNotes}
              selectSharedNote={selectSharedNote}
              selectedSharedNoteIndex={selectedSharedNoteIndex}
              deleteSharedNote={deleteSharedNote}

              selectStudy={selectStudy}
              selectGroup={selectGroup}



            />
          </Grid>
          {(selectedNote && showNote) ? (
            <Grid item xs={(showCard) ? 7 : 10}>
              <EditorComponent
                selectedNote={selectedNote}
                noteUpdate={noteUpdate}
                selectedNotebookIndex={selectedNotebookIndex}
                closeNote={closeNote}
                shareNote={shareNote}
              />
            </Grid>
          ) : null}

          {(selectedSharedNote && showSharedNotes) ? (
            <Grid item xs={(showCard || showChat) ? 7 : 10}>
              <SharedNoteEditor
                selectedSharedNoteIndex={selectedSharedNoteIndex}
                sharedNoteUpdate={sharedNoteUpdate}
                closeSharedNote={closeSharedNote}
                selectChat={selectChat}
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

            <Grid item xs={(showNote || showSharedNotes) ? 3 : 7} >

              <CardEditorComponent
                selectedCard={selectedCard}
                cardUpdate={cardUpdate}
                selectedDeckIndex={selectedDeckIndex}
                closeCard={closeCard}
              />
            </Grid>
          ) : null}

          {(showSharedNotes && showChat) ? (
            <Grid item xs={3}>
              <ChatComponent
                userEmail={user.user.email}
                selectedSharedNote={selectedSharedNote}
                closeChat={closeChat}
              />
            </Grid>
          ) : null}

        </Grid>
      ) : (
        <p></p>


      )}

    </div>
  );
};


export default App;
