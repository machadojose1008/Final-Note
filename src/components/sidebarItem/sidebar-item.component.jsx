import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles'
import { ListItem, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { removeHTMLTags } from '../../helpers';

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
      <ListItem
        className="listItem"
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
        onClick={handleSelectNote}
      >
        <div className="textSection">
          <ListItemText
            primary={_note.title}
            secondary={`${removeHTMLTags(_note.body.substring(0, 30))}...`}
          />
        </div>
        <Delete onClick={handleDeleteNote} className="deleteIcon" />
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(SidebarItemComponent);
