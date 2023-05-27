import { ListItemText } from '@mui/material';
import React from 'react';
import { DeleteIcon, NotesList, SelectNote } from '../componentStyles';


function SidebarItemComponent(props) {
    const { _noteIndex, _note, notebookIndex, selectedNoteIndex, selectNote, deleteNote } = props;

    const handleSelectNote = () => {
        selectNote(_note, _noteIndex, notebookIndex);
    };

    const handleDeleteNote = () => {
        if (window.confirm(`Tem certeza que deseja deletar: ${_note.title}`)) {
            deleteNote(_note, notebookIndex);
        }
    };

    return (
        <div key={_noteIndex}>
            <NotesList
                selected={selectedNoteIndex === _noteIndex}
                alignItems='flex-start'
                onClick={handleSelectNote}
            >
                <SelectNote onClick={handleSelectNote}>
                    <ListItemText 
                        primary={_note.title}
                        primaryTypographyProps={{fontSize: 14, fontWeight:'medium',overflow:'unset'}}
                    />
                </SelectNote>
                <DeleteIcon onClick={handleDeleteNote} />
            </NotesList>
        </div >
    );
}

export default SidebarItemComponent;
