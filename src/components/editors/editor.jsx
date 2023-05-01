import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { Paper } from '@mui/material';
import { EditorContainer, EditorNavBar, TitleInput } from '../componentStyles';

const EditorComponent = ({ selectedNote, noteUpdate, selectedNotebookIndex }) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
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
            noteUpdate(id, selectedNotebookIndex, { title, body });
        }, 1500),
        [id]
    );

    useEffect(() => {
        setText(selectedNote.body || '');
        setTitle(selectedNote.title || '');
        setId(selectedNote.id || '');
    }, [selectedNote]);




    return (
        <EditorContainer>
            <EditorNavBar>
                <TitleInput
                    theme='null'
                    placeholder="Título da nota"
                    value={title ? title : ''}
                    onChange={(e) => updateTitle(e.target.value)}>
                </TitleInput>
            </EditorNavBar>
            <Paper elevation={3}>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={text}
                    onChange={updateBody}
                />
            </Paper>
        </EditorContainer>


    );
};

export default EditorComponent;
