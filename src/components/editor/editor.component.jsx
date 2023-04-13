import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { BorderColor } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import styles from './styles';

const EditorComponent = ({ classes, selectedNote, noteUpdate }) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
    }, [selectedNote]);

    const updateBody = async (val) => {
        await setText(val);
        update();
    };

    const updateTitle = async (txt) => {
        await setTitle(txt);
        update();
    };

    const update = debounce(() => {
        noteUpdate(id, { title, body: text });
    }, 1500);

    return (
        <div className={classes.EditorComponent}>
            <BorderColor className={classes.editIcon}></BorderColor>
            <input
                className={classes.titleInput}
                placeholder='Note title...'
                value={title ? title : ''}
                onChange={(e) => updateTitle(e.target.value)}
            />
            <ReactQuill value={text} onChange={updateBody} />
        </div>
    );
};

export default withStyles(styles)(EditorComponent);
