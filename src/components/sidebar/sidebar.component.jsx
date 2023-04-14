import { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles';
import List from '@mui/material/List';
import { Button, Chip } from '@mui/material';
import { Face } from "@mui/icons-material"
import SidebarItemComponent from '../sidebarItem/sidebar-item.component';

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

    return(
        <div className={classes.sidebarContainer}>
            <Chip icon={<Face />} label={props.user?.email} className={classes.chip} />
            <Button
                variant="contained"
                color={addingNote ? "secondary" : "primary"}
                onClick={newNoteBtnClick}
                className={classes.newNoteBtn}
            >
                {addingNote ? "Cancel" : "New Note"}
            </Button>
            {addingNote && (
                <div>
                    <input
                        type='text'
                        className={classes.newNoteInput}
                        placeholder='Enter note title'
                        onKeyUp={(e) => updateTitle(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.newNoteSubmitBtn}
                        onClick={newNote}
                    >
                        Submit Note
                    </Button>
                </div>
            )}
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
        </div>
    );
}

export default withStyles(styles)(SidebarComponent);
