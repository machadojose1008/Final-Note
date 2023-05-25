import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { Button, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddDialog, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import CloseIcon from '@mui/icons-material/Close';
import DateComponent from './date-component';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase-config';

const SharedNoteEditor = ({ selectedSharedNoteIndex, sharedNoteUpdate, closeSharedNote, selectChat }) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [updateDate, setUpdateDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const [openned, setOpenned] = useState(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image'],

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
        debounce((sharedNoteObj) => {
            sharedNoteUpdate(selectedSharedNoteIndex, sharedNoteObj);
            setUpdateDate(new Date());
        }, 1500),
        [id, selectedSharedNoteIndex, sharedNoteUpdate]
    );
    const setReviewDate = (reviewDate) => {
        // Atualiza a data do card do formato em milisegundos do firestore para o formato date do javascript
        const timestamp = reviewDate;
        const date = timestamp.toDate();
        return date;
    };

    const handleSelectChat = () => {
        selectChat();
    }

    const fetchSharedNote = async (selectedSharedNoteIndex) => {
        const sharedNoteRef = doc(db, 'sharedNotes', selectedSharedNoteIndex);
        const sharedNote = await getDoc(sharedNoteRef);
        const data = sharedNote.data();
        setBody(data.body);
        setTitle(data.title);
        setId(data.id);
        setOpenned(data.openned);
        setLastUpdate(setReviewDate(data.timestamp));

        
    }


    useEffect(() => {
        
        fetchSharedNote(selectedSharedNoteIndex);



        console.log(openned); 
    }, [selectedSharedNoteIndex]);

    useEffect(() => {
        if (updateDate) {
            setLastUpdate(updateDate);
        }
    }, [updateDate]);




    const handleSave = () => {
        update({ title, body });

    };


    return (


        <EditorContainer>
            <EditorNavBar>
                <Grid container>

                    <Grid item xs={11.7}>
                        <Title>
                            Título da nota:
                        </Title >
                    </Grid >
                    <Grid item xs={0.1}>
                        <IconButton onClick={closeSharedNote}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6.5}>
                        <TitleInput
                            placeholder="Título da nota"
                            value={title ? title : ''}
                            onChange={updateTitle}>
                        </TitleInput>
                    </Grid>
                    <Grid item xs={3}>
                        {lastUpdate === '' ? (
                            null
                        ) : (
                            <DateComponent date={lastUpdate} />)}
                    </Grid>

                    <Grid sx={{ paddingTop: '5px', display: 'flex', justifyContent: 'flex-end' }} item xs={1}>
                        <div>
                            <Button sx={{ width: '100px', padding: '10px 5px', }} variant="contained" color="primary" onClick={handleSave}>
                                Salvar
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={.5} >
                        <div >
                            <IconButton onClick={handleSelectChat} size='large'>
                                <ChatIcon sx={{ fontSize: 30 }} size='large'

                                />
                            </IconButton>
                        </div>
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

export default SharedNoteEditor;
