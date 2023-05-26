import { Face } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import NoteIcon from '@mui/icons-material/Note';
import ShareIcon from '@mui/icons-material/Share';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import { TreeView } from '@mui/lab';
import { Button, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import { useLayoutEffect, useState } from 'react';
import { ActionList, AddDialog, SidebarContainer, UserIcon } from '../componentStyles';
import AddCard from './buttons/add-card';
import AddDeck from './buttons/add-deck';
import AddNote from './buttons/add-note';
import AddNotebook from './buttons/add-notebook';
import SelectStudy from './buttons/select-study';
import SidebarButton from './buttons/sidebar-button';
import SidebarCardComponent from './sidebar-card';
import SidebarItemComponent from './sidebar-notes';
import SidebarSharedNoteComponent from './sidebar-shared';
import { StyledTreeItem } from './styled-tree-item';

function SidebarComponent(props) {
    const { decks = [], notebooks = [], selectedNoteIndex, selectedCardIndex, selectedSharedNoteIndex, selectStudy, selectGroup } = props;

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState(null);

    const [notebookTitle, setNotebookTitle] = useState(null);
    const [notebooksTitle, setNotebooksTitle] = useState([]);

    const [cards, setCards] = useState([]);
    const [cardTitle, setCardTitle] = useState(null);

    const [decksTitle, setDecksTitle] = useState([]);
    const [deckTitle, setDeckTitle] = useState(null);

    const [sharedNotes, setSharedNotes] = useState([]);


    const [openNotebookDialog, setOpenNotebookDialog] = useState(false);
    const [openDeckDialog, setOpenDeckDialog] = useState(false);
    const [renameId, setRenameId] = useState(null);


    const newNote = (txt, notebookTitle) => {
        props.newNote(txt, notebookTitle);
        setTitle(null);
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


    const selectSharedNote = (sharedNote, sharedNoteIndex) => {
        props.selectSharedNote(sharedNote, sharedNoteIndex);

    }

    const selectCard = (card, deckIndex, cardIndex) => {
        props.selectCard(card, deckIndex, cardIndex);
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

    useLayoutEffect(() => {

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



    }, [decks, notebooks])

    useLayoutEffect(() => {
        setSharedNotes(props.sharedNotes);
    }, [props.sharedNotes]);

    return (
        <div>
            {(decks.length === 0 || notebooks.length === 0) ? (
                <p>Carregando...</p>
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
                                <StyledTreeItem
                                    renamemenu={renameMenu}
                                    nodeId={notebook.id}
                                    labelText={notebook.title}
                                    showMenu={true}
                                    key={notebook.id}
                                    deleteMenu={deleteMenu}
                                    labelIcon={TextSnippetIcon}
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

                            <StyledTreeItem nodeId='decks' labelText='Decks' labelIcon={NoteIcon} >
                                {decks.map((deck) => (
                                    <StyledTreeItem
                                        nodeId={deck.id}
                                        showMenu={true}
                                        labelText={deck.title}
                                        key={deck.id}
                                        deleteMenu={deleteMenu}
                                        labelIcon={TextSnippetRoundedIcon}
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






                    <IconButton
                        sx={{
                            width: '100%',
                            borderRadius: '0.5em',
                            display: 'inline-flex',
                            justifyContent: 'flex-start'
                        }}
                        onClick={selectGroup}
                    >
                        <GroupIcon />
                        <Typography sx={{ paddingLeft: '10px' }}>
                            Grupos
                        </Typography>

                    </IconButton>



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
