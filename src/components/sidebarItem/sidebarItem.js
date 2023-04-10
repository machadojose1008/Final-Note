import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Delete } from '@mui/icons-material';
import { removeHTMLTags } from '../../helpers';


class SidebarItemComponent extends React.Component {
    render(){

        const {_index, _note, classes, selectedNoteIndex} = this.props;

        return(
            <div key={_index}>
                <ListItem
                    className={classes.listItem}
                    selected={selectedNoteIndex === _index}
                    alignItems='flex-start'>
                        <div 
                            className={classes.textSection}
                            onClick={() => this.selectNote(_note, _index)}>
                                <ListItemText
                                    primary={_note.title}
                                    secondary={removeHTMLTags(_note.body.substring(0, 30))+ '...'}></ListItemText>
                        </div>
                        <Delete onClick={() => this.deleteNote(_note)}
                            className={classes.deleteIcon}></Delete>
                </ListItem>
            </div>
        );
    }

    selectNote = (n, i) => this.props.selectNote(n,i);
    deleteNote = (note) => {
        if(window.confirm(`Tem certeza que deseja deletar: ${note.title}`)){
            this.props.deleteNote(note);
        }
    }

}

export default withStyles(styles)(SidebarItemComponent);