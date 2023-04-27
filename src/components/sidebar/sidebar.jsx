import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-notes';
import { SidebarContainer, UserIcon, ActionList } from '../componentStyles'
import NestedListComponent from './nested-lists/notes-list';
import SidebarCardComonent from './sidebar-card';
import NestedCardComponent from './nested-lists/cards-list';
import SidebarButton from './nested-lists/sidebar-button';
import NestedNotebookComponent from './nested-lists/notebooks-list';
import SidebarNotebookComponent from './sidebar-notebooks';
import AddNote from './buttons/add-note';
import AddCard from './buttons/add-card';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function SidebarComponent(props) {
    const { cards, notebooks, selectedNotebookIndex, selectedNoteIndex, selectedCardIndex } = props;
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);
    const [cardTitle, setCardTitle] = useState(null);
    const [notes, setNotes] = useState([]);


    const newNote = (txt) => {
        props.newNote(txt);
        setTitle(null);
        setAddingNote(false);
    }

    const newCard = (txt) => {
        props.newCard(txt);
        setCardTitle(null);
    }


    const selectNote = (note, notebookIndex, noteIndex) => {
        props.selectNote(note, notebookIndex,noteIndex);
    }

    const selectCard = (c, i) => {
        props.selectCard(c, i);
    }

    const selectNotebook = (c, i) => {
        props.selectNotebook(c, i);
    }

    const deleteNotebook = (n, i) => {
        props.deleteNotebook(n, i);
    }

    const deleteNote = (n, i) => {
        props.deleteNote(n, i);
    }

    const deleteCard = (n, i) => {
        props.deleteCard(n, i);
    }

    useEffect(() => {

        //notebooks.notes.map(el => console.log(el));

        const settingNotes = async () => {
            const fetchNotes = await notebooks.map(el => el.notes);
            setNotes(fetchNotes);
        }
        settingNotes();



    }, [])

    return (
        <div>
            {notes.length === 0 ? (
                <p>Carregando as notas...</p>
            ) : (

                <SidebarContainer>
                    <UserIcon icon={<Face />} label={props.user?.email} />
                    <SidebarButton>
                        <ActionList />
                        <AddNote newNote={newNote} />
                        <AddCard newCard={newCard} />
                    </SidebarButton>

                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{ maxWidth: 200 }}
                    >
                        <TreeItem nodeId='notebooks' label='Notebooks' >
                            {notebooks.map((notebook, notebookIndex) => (
                                <TreeItem nodeId={notebook.id} label={notebook.title} > 
                                    {/*  {notebook.notes.map((note) => (
                                        <TreeItem
                                            key={note.id}
                                            noteId={`${notebook.id}-${note.id}`}
                                            label={note.title}
                                            onClick={handleClick(note, note.id)}
                                        />
                                    ))} */}
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





                    <NestedNotebookComponent>
                        {notebooks && (
                            <List>
                                {notebooks.map((_notebook, _index) => (
                                    <div key={_index}>
                                        <SidebarNotebookComponent
                                            _index={_index}
                                            _notebook={_notebook}
                                            selectedNotebookIndex={selectedNotebookIndex}
                                            selectNotebook={selectNotebook}
                                            deleteNotebook={deleteNotebook}
                                        />
                                    </div>
                                ))}
                            </List>
                        )}
                    </NestedNotebookComponent>

                    <NestedCardComponent>
                        {cards && (
                            <List>
                                {cards.map((_card, _index) => (
                                    <div key={_index}>
                                        <SidebarCardComonent
                                            _card={_card}
                                            _index={_index}
                                            selectedCardIndex={selectedCardIndex}
                                            selectCard={selectCard}
                                            deleteCard={deleteCard} />
                                    </div>
                                ))}
                            </List>
                        )}
                    </NestedCardComponent>
                </SidebarContainer>


            )}

        </div>

    );
}

export default SidebarComponent;
