import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-notes';
import SidebarCardComponent from './sidebar-card';
import { SidebarContainer, UserIcon, ActionList, StyledTreeItem } from '../componentStyles'
import SidebarButton from './nested-lists/sidebar-button';
import AddNote from './buttons/add-note';
import AddCard from './buttons/add-card';
import { TreeItem, TreeView } from '@mui/lab';
import AddNotebook from './buttons/add-notebook';
import AddDeck from './buttons/add-deck';
import SelectStudy from './buttons/select-study';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BookIcon from '@mui/icons-material/Book';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import NoteIcon from '@mui/icons-material/Note';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';

function SidebarComponent(props) {
    const { decks, notebooks, selectedNoteIndex, selectedCardIndex, selectStudy } = props;
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

    const menuAnchor = (nodeId) => {
        console.log(nodeId);
    }

    const renameMenu = (nodeId) => {
        console.log(nodeId);
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
                    <SelectStudy selectStudy={selectStudy} />

                    <TreeView
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                        sx={{ maxWidth: 200 }}
                    >
                        <StyledTreeItem nodeId='notebooks' labelText='Notebooks' labelIcon={BookIcon} >
                            {notebooks.map((notebook) => (
                                <StyledTreeItem renameMenu={renameMenu} nodeId={notebook.id} labelText={notebook.title} showMenu={true} key={notebook.id} labelIcon={TextSnippetIcon}  >
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
                                </StyledTreeItem>
                            ))}
                        </StyledTreeItem>




                    </TreeView>

                    <TreeView
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                        sx={{ maxWidth: 200 }}
                    >
                        <StyledTreeItem nodeId='decks' labelText='Decks' labelIcon={NoteIcon}>
                            {decks.map((deck) => (
                                <div>
                                    <StyledTreeItem nodeId={deck.id} showMenu={true} labelText={deck.title} key={deck.id} labelIcon={TextSnippetRoundedIcon}>
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


                                    </StyledTreeItem>

                                </div>

                            ))}
                        </StyledTreeItem>

                    </TreeView>

                </SidebarContainer>


            )}

        </div>

    );
}

export default SidebarComponent;
