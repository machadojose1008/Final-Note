import { useState } from 'react';
import { withStyles } from '@mui/styles';
import List from '@mui/material/List';
import { Button } from '@mui/material';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from './sidebar-item.component';
import { SidebarContainer, UserIcon, NewNoteInput } from './componentStyles'
import NestedList from './nested-list.component';

function SidebarComponent(props) {
    const { notes, classes, selectedNoteIndex } = props;
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);

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

            <NestedList>
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

            </NestedList>
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
