import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { Button, IconButton, Input, Paper, TextField } from '@mui/material';
import { EditorContainer, EditorNavBar, TitleInput } from '../componentStyles';
import CloseIcon from '@mui/icons-material/Close';

const EditorComponent = ({ selectedNote, noteUpdate, selectedNotebookIndex, closeNote }) => {
    const [body, setBody] = useState('');
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


    const updateBody = (val) => {
        setBody(val);
        update({ body: val, title: title });
    }


    const updateTitle = (event) => {
        const titleVal = event.target.value;
        setTitle(titleVal);
        update({ title: titleVal, body: body });
    }

    const update = useCallback(
        debounce((noteObj) => {
            noteUpdate(id, selectedNotebookIndex, noteObj);
        }, 1500),
        [id, selectedNotebookIndex, noteUpdate]
    );


    useEffect(() => {
        setBody(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
    }, [selectedNote.body, selectedNote.title, selectedNote.id]);


    const handleSave = () => {
        update({ title, body });
    };


    return (
        <EditorContainer>
            <EditorNavBar>
                <IconButton onClick={closeNote}>
                    <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
                <TextField
                    sx={{
                        width: '400px'
                    }}
                    id='filled-titleText'
                    label='Titulo da nota'
                    placeholder="Título da nota"
                    defaultValue={title ? title : ''}
                    variant='filled'
                    onChange={updateTitle}>
                </TextField>
            </EditorNavBar>
            <Button sx={{width: '200px'}} variant="contained" color="primary" onClick={handleSave}>
                Salvar
            </Button>
            <Paper elevation={3}>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={body ? body : ''}
                    onChange={updateBody}
                />
            </Paper>
        </EditorContainer>


    );
};

export default EditorComponent;
