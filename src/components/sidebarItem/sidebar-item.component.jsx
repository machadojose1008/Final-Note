import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { removeHTMLTags } from '../../helpers';
import { makeStyles } from '@mui/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

function SidebarItemComponent(props) {
    const classes = useStyles();
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
            <ListItemButton
                className={classes.listItem}
                selected={selectedNoteIndex === _index}
                alignItems='flex-start'
                onClick={handleSelectNote}
            >
                <div className={classes.textSection} onClick={handleSelectNote}>
                    <ListItemText
                        primary={_note.title}
                        secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}
                    />
                </div>
                <Delete onClick={handleDeleteNote} className={classes.deleteIcon} />
            </ListItemButton>
        </div>
    );
}

export default SidebarItemComponent;
