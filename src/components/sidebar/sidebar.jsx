import { Logout } from "@mui/icons-material";
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BookIcon from '@mui/icons-material/Book';
import NoteIcon from '@mui/icons-material/Note';
import ShareIcon from '@mui/icons-material/Share';
import { TreeView } from '@mui/lab';
import {  Button, DialogContent, DialogTitle, Menu, MenuItem, TextField} from '@mui/material';
import List from '@mui/material/List';
import { useLayoutEffect, useState } from 'react';
import { AddDialog, SidebarContainer, UserIcon } from '../componentStyles';
import AddCard from './buttons/add-card';
import AddDeck from './buttons/add-deck';
import AddNote from './buttons/add-note';
import AddNotebook from './buttons/add-notebook';
import SelectStudy from './buttons/revisar-srs';
import SidebarButton from './buttons/dropDown-button';
import SidebarCardComponent from './itens/sidebar-card';
import SidebarItemComponent from './itens/sidebar-notes';
import SidebarSharedNoteComponent from './itens/sidebar-shared';
import { StyledTreeItem } from './itens/styled-tree-item';
import TopicIcon from '@mui/icons-material/Topic';
import SearchBox from "./Search";


function SidebarComponent(props) {
    const { decks = [], notebooks = [], selectedNoteIndex, selectedCardIndex, selectedSharedNoteIndex, selectStudy, selectGroup } = props;

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState(null);
    const [notesSearch, setNotesSearch] = useState([]);

    const [notebookTitle, setNotebookTitle] = useState(null);
    const [notebooksTitle, setNotebooksTitle] = useState([]);
    const [selectedNotebookIndex, setSelectedNotebookIndex] = useState(null);

    const [cards, setCards] = useState([]);
    const [cardTitle, setCardTitle] = useState(null);
    const [cardsSearch, setCardsSearch] = useState([]);

    const [decksTitle, setDecksTitle] = useState([]);
    const [deckTitle, setDeckTitle] = useState(null);
    const [selectedDeckIndex, setSelectedDeckIndex] = useState(null);

    const [sharedNotes, setSharedNotes] = useState([]);


    const [openNotebookDialog, setOpenNotebookDialog] = useState(false);
    const [openDeckDialog, setOpenDeckDialog] = useState(false);
    const [renameId, setRenameId] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);


    const newNote = (txt, notebookTitle) => {
        props.newNote(txt, notebookTitle);
        setTitle(null);
    }

    const handleLogOut = () => {
        props.logOut();
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


    const selectNote = (note, noteIndex, notebookIndex) => {
        props.selectNote(note, noteIndex, notebookIndex);
    }


    const selectSharedNote = (sharedNote, sharedNoteIndex) => {
        props.selectSharedNote(sharedNote, sharedNoteIndex);

    }

    const selectCard = (card, cardIndex, deckIndex) => {
        props.selectCard(card, cardIndex, deckIndex);
    }


    const deleteNote = (note, notebookIndex) => {
        props.deleteNote(note, notebookIndex);
    };

    const deleteCard = (n, i) => {
        props.deleteCard(n, i);
    };

    const deleteSharedNote = (sharedNote) => {
        props.deleteSharedNote(sharedNote);
    }


    const renameMenu = (id, type) => {
        // Abre o dialog para definir o novo título do menu lateral
        setRenameId(id);
        if (type === 'notebook') {
            setOpenNotebookDialog(true);
        } else if (type === 'deck') {
            setOpenDeckDialog(true);
        }
    };

    const deleteMenu = (id, type) => {
        // Abre o dialog para confirmar se deseja deletar o item
        if (type === 'notebook') {
            if (window.confirm(`Tem certeza que deseja deletar o notebook?`)) {
                props.deleteNotebook(id);
            }
        } else if (type === 'deck') {
            if (window.confirm(`Tem certeza que deseja deletar o deck?`)) {
                props.deleteDeck(id);
            }
        }
    }

    const handleNotebookTitle = (txt) => {
        setNotebookTitle(txt);
    };

    const closeRenameNotebook = () => {
        setOpenNotebookDialog(false);
    }

    const handleDeckTitle = (txt) => {
        setDeckTitle(txt);
    };

    const closeRenameDeck = () => {
        setOpenDeckDialog(false);
    }

    const renameDeck = () => {
        props.renameDeck(renameId, deckTitle);
        setOpenDeckDialog(false);
    };

    const renameNotebook = () => {
        props.renameNotebook(renameId, notebookTitle);
        setOpenNotebookDialog(false);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    useLayoutEffect(() => {
        const settingNotes = async () => {
            const fetchNotes = await notebooks.map(el => el.notes);
            setNotes(fetchNotes);
            const mergedNotes = await mergeArrays(fetchNotes);
            setNotesSearch(mergedNotes);
        }

        const settingTitles = async () => {
            const fetchTitle = await notebooks.map(el => el.title);
            setNotebooksTitle(fetchTitle);
        }

        const settingCards = async () => {
            const fetchCards = await decks.map(el => el.cards);
            setCards(fetchCards);
            const mergedCards = await mergeArrays(fetchCards);
            setCardsSearch(mergedCards);
        }

        const settingCardTitles = async () => {
            const fetchCardTitle = await decks.map(el => el.title);
            setDecksTitle(fetchCardTitle);
        }

        settingNotes();
        settingTitles();
        settingCards();
        settingCardTitles();



    }, [decks, notebooks])

    useLayoutEffect(() => {
        setSharedNotes(props.sharedNotes);
    }, [props.sharedNotes]);

    const mergeArrays = async (array) => {
        // Função que vai pegar o array de arrays e juntar os objetos em um array só.
        const mergedCards = await array.reduce((acc, curr) => acc.concat(curr), []);
        return mergedCards;
    };

    const SelectSearch = (item) => {
        // Função executada quando a seleção de um item é feita na busca selecionando o item.
        if (item === null) {
            return;
        } else {
            if ('ease' in item) {
                // é um card
                decks.map((deck) => {
                    deck.cards.map((card) => {
                        if (card.id === item.id) {
                            setSelectedDeckIndex(deck.id);
                        };
                    })
                })

                props.selectCard(item, item.id, selectedDeckIndex);

            } else {
                // é uma note 
                notebooks.map((notebook) => {
                    notebook.notes.map((note) => {
                        if (note.id === item.id) {
                            setSelectedNotebookIndex(notebook.id);
                        }
                    })
                })

                props.selectNote(item, item.id, selectedNotebookIndex);
            }
        }

    }

    return (
        <div>
            {(decks.length === 0 || notebooks.length === 0) ? (
                <p>Carregando...</p>
            ) : (

                <SidebarContainer>

                    <UserIcon onClick={handleMenu} label={props.username} icon={<Logout />} >

                    </UserIcon>
                    <Menu
                        id='user-menu'
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem onClick={handleLogOut} >Sair</MenuItem>
                    </Menu>
                    {(decks.length !== 0 && notebooks.length !== 0 && cards.length !== 0 && notes.length !== 0) ? (
                        <SearchBox
                            notes={notesSearch}
                            cards={cardsSearch}
                            select={SelectSearch}
                        />

                    ) : null}

                    <SidebarButton>
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
                        <StyledTreeItem nodeId='notebooks' labelText='Cadernos' labelIcon={TopicIcon} >
                            {notebooks.map((notebook) => (
                                <StyledTreeItem
                                    renamemenu={renameMenu}
                                    nodeId={notebook.id}
                                    labelText={notebook.title}
                                    showMenu={true}
                                    key={notebook.id}
                                    deleteMenu={deleteMenu}
                                    labelIcon={BookIcon}
                                    type={'notebook'}
                                >
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

                    {decks.length === undefined ? (
                        (<p>indefinido</p>)

                    ) :
                        < TreeView
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            defaultEndIcon={<div style={{ width: 24 }} />}
                            sx={{ maxWidth: 200 }}
                        >

                            <StyledTreeItem nodeId='decks' labelText='Baralhos' labelIcon={TopicIcon} >
                                {decks.map((deck) => (
                                    <StyledTreeItem
                                        nodeId={deck.id}
                                        showMenu={true}
                                        labelText={deck.title}
                                        key={deck.id}
                                        deleteMenu={deleteMenu}
                                        labelIcon={NoteIcon}
                                        renamemenu={renameMenu}
                                        type={'deck'}
                                    >
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
                                ))}
                            </StyledTreeItem>
                        </TreeView>
                    }

                    {sharedNotes && (
                        <TreeView
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            defaultEndIcon={<div style={{ width: 24 }} />}
                            sx={{ maxWidth: 200 }}
                        >
                            <StyledTreeItem nodeId='sharedNotes' labelText='Notas Compartilhadas' labelIcon={ShareIcon}>

                                <List>
                                    {sharedNotes.map((sharedNote) => (
                                        <div key={sharedNote.id}>
                                            <SidebarSharedNoteComponent
                                                _sharedNote={sharedNote}
                                                _sharedNoteIndex={sharedNote.id}
                                                selectedSharedNoteIndex={selectedSharedNoteIndex}
                                                selectSharedNote={selectSharedNote}
                                                deleteSharedNote={deleteSharedNote}
                                            />
                                        </div>
                                    ))}
                                </List>


                            </StyledTreeItem>

                        </TreeView>
                    )}


                    <AddDialog open={openNotebookDialog} onClose={closeRenameNotebook} >
                        <DialogTitle>Insira o novo nome do Notebook</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                id='Nome'
                                sx={{ padding: '0px 0px 15px' }}
                                label='Nome do Notebook'
                                type='text'
                                fullWidth
                                variant="standard"
                                onChange={(e) => handleNotebookTitle(e.target.value)}
                            />
                        </DialogContent>
                        <Button onClick={closeRenameNotebook} sx={{ color: 'black', }}>Cancelar</Button>
                        <Button onClick={renameNotebook}>Pronto</Button>
                    </AddDialog>



                    <AddDialog open={openDeckDialog} onClose={closeRenameDeck} >
                        <DialogTitle>Insira o novo nome do Deck</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                id='Nome'
                                sx={{ padding: '0px 0px 15px' }}
                                label='Nome do Deck'
                                type='text'
                                fullWidth
                                variant="standard"
                                onChange={(e) => handleDeckTitle(e.target.value)}
                            />
                        </DialogContent>
                        <Button onClick={closeRenameDeck} sx={{ color: 'black', }}>Cancelar</Button>
                        <Button onClick={renameDeck}>Pronto</Button>
                    </AddDialog>



                </SidebarContainer>


            )
            }
        </div >
    );
}

export default SidebarComponent;
