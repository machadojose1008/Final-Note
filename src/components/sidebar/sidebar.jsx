import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-notes';
import SidebarCardComponent from './sidebar-card';
import { SidebarContainer, UserIcon, ActionList } from '../componentStyles'
import SidebarButton from './nested-lists/sidebar-button';
import AddNote from './buttons/add-note';
import AddCard from './buttons/add-card';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddNotebook from './buttons/add-notebook';
import AddDeck from './buttons/add-deck';

function SidebarComponent(props) {
    const { decks,  notebooks, selectedNotebookIndex, selectedDeckIndex, selectedNoteIndex, selectedCardIndex } = props;
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);
    const [cardTitle, setCardTitle] = useState(null);
    const [notes, setNotes] = useState([]);
    const [notebooksTitle, setNotebooksTitle] = useState([]);
    const [decksTitle, setDecksTitle] = useState([]);
    const [cards, setCards] = useState([]);


    const newNote = (txt, notebookTitle) => {
        props.newNote(txt, notebookTitle);
        setTitle(null);
        //setAddingNote(false);
    }

    const newNotebook = (notebookTitle) => {
        props.newNotebook(notebookTitle);
    }

    const newCard = (txt, deckTitle) => {
        props.newCard(txt, deckTitle);
        setCardTitle(null);
    }

    const newDeck = (deckTitle) => {
        props.newDeck(deckTitle);
    }


    const selectNote = (note, notebookIndex, noteIndex) => {
        props.selectNote(note, notebookIndex, noteIndex);
    }

    const selectCard = (card, deckIndex, cardIndex) => {
        props.selectCard(card, deckIndex, cardIndex);
    }


    const deleteNote = (note, notebookIndex) => {
        props.deleteNote(note, notebookIndex);
    }

    const deleteCard = (n, i) => {
        props.deleteCard(n, i);
    }

    useEffect(() => {


        const settingNotes = async () => {
            const fetchNotes = await notebooks.map(el => el.notes);
            setNotes(fetchNotes);
        }

        const settingTitles = async () => {
            const fetchTitle = await notebooks.map(el => el.title);
            setNotebooksTitle(fetchTitle);
        }

        const settingCards = async () => {
            const fetchCards = await decks.map(el => el.cards);
            setCards(fetchCards);
        }

        const settingCardTitles = async () => {
            const fetchCardTitle = await decks.map(el => el.title);
            setDecksTitle(fetchCardTitle);
        }
        settingNotes();
        settingTitles();
        settingCards();
        settingCardTitles();




    }, [])

    return (
        <div>
            {(notes.length || cards.length) === 0 ? (
                <p>Carregando as notas...</p>
            ) : (

                <SidebarContainer>
                    <UserIcon icon={<Face />} label={props.user?.email} />
                    <SidebarButton>
                        <ActionList />
                        <AddNotebook newNotebook={newNotebook} />
                        <AddNote notebooksTitle={notebooksTitle} newNote={newNote} /> 
                        <AddDeck newDeck={newDeck} />
                        <AddCard decksTitle={decksTitle} newCard={newCard} />
                    </SidebarButton>

                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ maxWidth: 200 }}
                    >
                        <TreeItem nodeId='notebooks' label='Notebooks' >
                            {notebooks.map((notebook) => (
                                <TreeItem nodeId={notebook.id} label={notebook.title} key={notebook.id}>
                                    {notes && (
                                        <List>
                                            {notebook.notes.map((_note, _noteIndex) => (
                                                <div key={_noteIndex}>
                                                    <SidebarItemComponent
                                                        _note={_note}
                                                        _index={_noteIndex}
                                                        selectedNoteIndex={selectedNoteIndex}
                                                        notebookIndex={notebook.id}
                                                        selectNote={selectNote}
                                                        deleteNote={deleteNote}
                                                    />
                                                </div>
                                            ))}
                                        </List>
                                    )}
                                </TreeItem>
                            ))}
                        </TreeItem>

                    </TreeView>

                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ maxWidth: 200 }}
                    >
                        <TreeItem nodeId='decks' label='Decks' >
                            {decks.map((deck) => (
                                <TreeItem nodeId={deck.id} label={deck.title} key={deck.id}>
                                    {cards && (
                                        <List>
                                            {deck.cards.map((_card, _cardIndex) => (
                                                <div key={_cardIndex}>
                                                    <SidebarCardComponent
                                                        _card={_card}
                                                        _index={_cardIndex}
                                                        selectedCardIndex={selectedCardIndex}
                                                        deckIndex={deck.id}
                                                        selectCard={selectCard}
                                                        deleteCard={deleteCard}
                                                    />
                                                </div>
                                            ))}
                                        </List>
                                    )}
                                </TreeItem>
                            ))}
                        </TreeItem>

                    </TreeView>

                </SidebarContainer>


            )}

        </div>

    );
}

export default SidebarComponent;
