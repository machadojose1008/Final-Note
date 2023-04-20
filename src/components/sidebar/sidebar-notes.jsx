import React from 'react';
import { removeHTMLTags } from '../../helpers';
import { NotesList, SelectNote, NoteText, DeleteIcon } from '../componentStyles'


function SidebarItemComponent(props) {
    const { _index, _note, selectedNoteIndex, selectNote, deleteNote } = props;

    const handleSelectNote = () => {
        selectNote(_note, _index);
    };

    const handleDeleteNote = () => {
        if (window.confirm(`Tem certeza que deseja deletar: ${_note.title}`)) {
            deleteNote(_note);
        }
    };

    return (
        <div key={_index}>
            <NotesList
                selected={selectedNoteIndex === _index}
                alignItems='flex-start'
                onClick={handleSelectNote}
            >
                <SelectNote onClick={handleSelectNote}>
                    <NoteText primary={_note.title}
                        secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}
                    />
                </SelectNote>
                <DeleteIcon  onClick={handleDeleteNote} />
            </NotesList>
        </div >
    );
}

export default SidebarItemComponent;
