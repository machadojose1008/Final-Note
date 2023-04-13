import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles';
import List from '@mui/material/List';
import { Button } from '@mui/material';
//import SidebarItemComponent from '../sidebarItem/sidebarItem';
import SidebarItemComponent from '../sidebarItem/sidebar-item.component';

const SidebarComponent = ({ notes, classes, selectedNoteIndex, newNote, selectNote, deleteNote }) => {
    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);

    const newNoteBtnClick = () => {
        setTitle(null);
        setAddingNote(!addingNote);
    };

    const updateTitle = (txt) => {
        setTitle(txt);
    };

    const submitNewNote = () => {
        newNote(title);
        setTitle(null);
        setAddingNote(false);
    };

    return notes ? (
        <div className={classes.sidebarContainer}>
            <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
                {addingNote ? 'Cancel' : 'New Note'}
            </Button>
            {addingNote ? (
                <div>
                    <input
                        type="text"
                        className={classes.newNoteInput}
                        placeholder="Enter note title"
                        onKeyUp={(e) => updateTitle(e.target.value)}
                    />
                    <Button className={classes.newNoteSubmitBtn} onClick={submitNewNote}>
                        Submit Note
                    </Button>
                </div>
            ) : null}
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
        </div>
    ) : (
        <div />
    );
};

export default withStyles(styles)(SidebarComponent);
