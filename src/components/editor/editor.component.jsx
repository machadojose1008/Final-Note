import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { withStyles } from '@mui/styles';
import styles from './styles';

const EditorComponent = ({ classes, selectedNote, noteUpdate }) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }]
        ],
        clipboard: {
            matchVisual: false
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const updateBody = useCallback(
        (val) => {
            setText(val);
            update({ title, body: val });
        },
        [title]
    );

    const updateTitle = useCallback(
        (txt) => {
            setTitle(txt);
            update({ title: txt, body: text });
        },
        [text]
    );

    const update = useCallback(
        debounce(({ title, body }) => {
            noteUpdate(id, { title, body });
        }, 1500),
        [id]
    );

    useEffect(() => {
        setText(selectedNote.body || '');
        setTitle(selectedNote.title || '');
        setId(selectedNote.id || '');
    }, [selectedNote]);



    return (
        <div className={classes.EditorComponent}>
            <div className={classes.editorNavbar}>
                <input
                    className={classes.titleInput}
                    placeholder="Note title..."
                    value={title ? title : ''}
                    onChange={(e) => updateTitle(e.target.value)}
                />
            </div>
            <ReactQuill
                theme={'snow'}
                modules={modules}
                formats={formats}
                value={text}
                onChange={updateBody}
            />
        </div>
    );
};

export default withStyles(styles)(EditorComponent);
