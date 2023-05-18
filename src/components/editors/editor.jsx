import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { Button, Divider, Grid, IconButton, Paper } from '@mui/material';
import { DateShow, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import CloseIcon from '@mui/icons-material/Close';
import DateComponent from './date-component';

const EditorComponent = ({ selectedNote, noteUpdate, selectedNotebookIndex, closeNote }) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [lastUpdate, setLastUpdate] = useState(null);
    const [updateDate, setUpdateDate] = useState(null);

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
            setUpdateDate(new Date());
        }, 1500),
        [id, selectedNotebookIndex, noteUpdate]
    );
    const setReviewDate = (reviewDate) => {
        // Atualiza a data do card do formato em milisegundos do firestore para o formato date do javascript
        const timestamp = reviewDate;
        const date = timestamp.toDate();
        return date;
    };


    useEffect(() => {
        setBody(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
        setLastUpdate(setReviewDate(selectedNote.timestamp));
    }, [selectedNote.body, selectedNote.title, selectedNote.id, selectedNote.timestamp]);

    useEffect(() => {
        if (updateDate) {
            setLastUpdate(updateDate);
        }
    }, [updateDate]);




    const handleSave = () => {
     update({ title, body });
        console.log(lastUpdate.getHours());
    };


    return (
        

            <EditorContainer>
                <EditorNavBar>
                    <Grid container>
                        <Grid item xs={12}>
                            <Title>
                                Título da nota:
                            </Title >
                        </Grid >
                        <Grid item xs={7.5}>
                            <TitleInput
                                placeholder="Título da nota"
                                value={title ? title : ''}
                                onChange={updateTitle}>
                            </TitleInput>
                        </Grid>
                        <Grid item xs={3}>
                            {lastUpdate === null ? (
                                null
                            ) : (
                                <DateComponent date={lastUpdate} /> )}
                            </Grid>
                        <Grid sx={{paddingTop:'30px' }} item xs={1}>
                            <div>
                                <Button sx={{ width: '100px', padding: '10px 0px', }} variant="contained" color="primary" onClick={handleSave}>
                                    Salvar
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={0.3}>
                            <IconButton onClick={closeNote}>
                                <CloseIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Grid>
                    </Grid >


                </EditorNavBar >

                <Paper elevation={3}>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={body ? body : ''}
                        onChange={updateBody}
                    />
                </Paper>
            </EditorContainer >
            
      




    );
};

export default EditorComponent;
