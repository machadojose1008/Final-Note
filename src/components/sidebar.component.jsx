import { useState } from 'react';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-item.component';
import { SidebarContainer, UserIcon, NewNoteInput } from './componentStyles'
import NestedListComponent from './nested-list.component';
import SidebarCardComonent from './sidebar-card.component';

function SidebarComponent(props) {
    const { notes, cards, selectedNoteIndex, selectedCardIndex } = props;
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);

    console.log(cards);     

    const newNoteBtnClick = () => {
        setTitle(null);
        setAddingNote(!addingNote);
    }

    const updateTitle = (txt) => {
        setTitle(txt);
    }

    const newNote = () => {
        props.newNote(title);
        setTitle(null);
        setAddingNote(false);
    }

    const selectNote = (n, i) => {
        props.selectNote(n, i);
    }

    const selectCard = (n, i) => {
        props.selectCard(n, i);
    }


    const deleteNote = (n, i) => {
        props.deleteNote(n, i);
    }

    return (


        <SidebarContainer>
            <UserIcon icon={<Face />} label={props.user?.email} />
            <Button
                variant="contained"
                color={addingNote ? "secondary" : "primary"}
                onClick={newNoteBtnClick}
            >
                {addingNote ? "Cancelar" : "Nova nota"}
            </Button>

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
            <NestedListComponent>
                {cards && (
                    <List>
                        {cards.map((_card, _index) => (
                            <div key={_index}>
                                <SidebarCardComonent
                                    _card={_card}
                                    _index={_index}
                                    selectedCardIndex={selectedCardIndex}
                                    selectCard={selectCard} />
                            </div>
                        ))}
                    </List>
                )}
            </NestedListComponent>
            {addingNote && (
                <div>
                    <NewNoteInput
                        type='text'
                        placeholder='Título da nota'
                        onKeyUp={(e) => updateTitle(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={newNote}
                    >
                        Criar Nota
                    </Button>
                </div>
            )}


        </SidebarContainer>




    );
}

export default SidebarComponent;
