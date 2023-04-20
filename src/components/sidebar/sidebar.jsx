import { useState } from 'react';
import List from '@mui/material/List';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-notes';
import { SidebarContainer, UserIcon, ActionList } from '../componentStyles'
import NestedListComponent from './nested-lists/notes-list';
import SidebarCardComonent from './sidebar-card';
import NestedCardComponent from './nested-lists/cards-list';
import SidebarButton from './nested-lists/sidebar-button';
import AddNote from './buttons/add-note';
import AddCard from './buttons/add-card';

function SidebarComponent(props) {
    const { notes, cards, selectedNoteIndex, selectedCardIndex } = props;
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);
    const [cardTitle, setCardTitle] = useState(null);


    const newNote = (txt) => {
        props.newNote(txt);
        setTitle(null);
        setAddingNote(false);
    }

    const newCard = (txt) => {
        props.newCard(txt);
        setCardTitle(null);
    }

    const selectNote = (n, i) => {
        props.selectNote(n, i);
    }

    const selectCard = (c, i) => {
        props.selectCard(c, i);
    }


    const deleteNote = (n, i) => {
        props.deleteNote(n, i);
    }

    const deleteCard = (n, i) => {
        props.deleteCard(n, i);
    }

    return (
        <SidebarContainer>
            <UserIcon icon={<Face />} label={props.user?.email} />
            <SidebarButton>
                <ActionList />
                <AddNote newNote={newNote} />
                <AddCard newCard={newCard} />
            </SidebarButton>
            <NestedListComponent>
                {notes && (
                    <List>
                        {notes.map((_note, _index) => (
                            <div key={_index}>
                                <SidebarItemComponent
                                    _note={_note}
                                    _index={_index}
                                    selectedNoteIndex={selectedNoteIndex}
                                    selectNote={selectNote}
                                    deleteNote={deleteNote}
                                />
                            </div>
                        ))}
                    </List>
                )}
            </NestedListComponent>
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
    );
}

export default SidebarComponent;
