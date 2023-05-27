import React from 'react';
import { NotesList, SelectNote, DeleteIcon } from '../componentStyles'
import { ListItemText } from '@mui/material';


function SidebarSharedNoteComponent(props) {
    const { _sharedNoteIndex, _sharedNote, selectedSharedNoteIndex, selectSharedNote, deleteSharedNote } = props;

    const handleSelectSharedNote = () => {
        selectSharedNote(_sharedNote, _sharedNoteIndex);
    };

    const handleDeleteSharedNote = () => {
        if (window.confirm(`Tem certeza que deseja deletar: ${_sharedNote.title}`)) {
            deleteSharedNote(_sharedNote);
        }
    };

    return (
        <div key={_sharedNoteIndex}>
            <NotesList
                selected={selectedSharedNoteIndex === _sharedNoteIndex}
                alignItems='flex-start'
                onClick={handleSelectSharedNote}
            >
                <SelectNote onClick={handleSelectSharedNote}>
                    <ListItemText 
                        sx={{maxWidth:'150px'}}
                        primary={_sharedNote.title}
                        primaryTypographyProps={{fontSize: 14, fontWeight:'medium', overflow:'clip'}}
                    />
                </SelectNote>
                <DeleteIcon onClick={handleDeleteSharedNote} />
            </NotesList>
        </div >
    );
}

export default SidebarSharedNoteComponent;
