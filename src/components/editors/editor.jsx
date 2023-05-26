import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { Button, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddDialog, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import CloseIcon from '@mui/icons-material/Close';
import DateComponent from './date-component';
import ShareIcon from '@mui/icons-material/Share';
import uploadImage from './image-uploader';
import { AttachFile } from '@mui/icons-material';


const EditorComponent = ({ selectedNote, noteUpdate, selectedNotebookIndex, closeNote, shareNote }) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [updateDate, setUpdateDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const quillRef = useRef(null);

    const handleImageUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = handleFileChange;
        fileInput.click();
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        uploadImage(file).then((imageUrl) => {
            const range = quillRef.current.getEditor().getSelection();
            quillRef.current.getEditor().insertEmbed(range ? range.index : 0, 'image', imageUrl);
        });
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' }
                ],
                ['link'],
            ],
        },
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


    const handleShare = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }; 

    const handleEmail = (txt) => {
        setEmail(txt);
    };

    const shareNoteHandler = () => {
        shareNote(selectedNote, selectedNote.timestamp, email, selectedNotebookIndex);
    }



    useEffect(() => {
        setBody(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);
        if (selectedNote.timestamp) {
            setLastUpdate(setReviewDate(selectedNote.timestamp));
        }

    }, [selectedNote.body, selectedNote.title, selectedNote.id, selectedNote.timestamp]);

    useEffect(() => {
        if (updateDate) {
            setLastUpdate(updateDate);
        }
    }, [updateDate]);




    const handleSave = () => {
        update({ title, body });

    };


    return (


        < EditorContainer >
            <EditorNavBar>
                <Grid container>

                    <Grid item xs={11.7}>
                        <Title>
                            Título da nota:
                        </Title >
                    </Grid >
                    <Grid item xs={0.1}>
                        <IconButton onClick={closeNote}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                    </Grid>

                    <Grid item xs={5.5}>
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
                    <Grid sx={{ paddingTop: '5px'}} item xs={1}>
                        <div>
                            <Button sx={{ width: '130px' }} variant="contained" color="primary" onClick={handleImageUpload}>
                                <AttachFile />
                                <Typography sx={{ fontSize: '12px' }}>Imagem</Typography>
                            </Button>
                        </div>
                    </Grid>
                    <Grid sx={{ paddingTop: '5px' }} item xs={1}>
                        <div>
                            <Button sx={{ width: '130px' }} variant="contained" color="primary" onClick={handleShare}>
                                <ShareIcon />
                                <Typography sx={{ fontSize: '12px' }}>Compartilhar</Typography>
                            </Button>
                        </div>
                    </Grid>
                    <Grid sx={{ paddingTop: '5px', paddingLeft:'1px'}} item xs={1}>
                        <div>
                            <Button sx={{ width: '100px' }} variant="contained" color="primary" onClick={handleSave}>
                                Salvar
                            </Button>
                        </div>
                    </Grid>

                </Grid >


            </EditorNavBar >

            <Paper elevation={3}>
                <ReactQuill
                    ref={quillRef}
                    modules={modules}
                    formats={formats}
                    value={body ? body : ''}
                    onChange={updateBody}
                />
            </Paper>

            <AddDialog open={open} onClose={handleClose}>
                <DialogTitle>Insira o Email do usuário que deseja adicionar a nota</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='Email'
                        sx={{ padding: '0px 0px 15px' }}
                        label='Email do usuário'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleEmail(e.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose} sx={{ color: 'black' }}>Cancelar</Button>
                <Button onClick={shareNoteHandler}>Confirmar</Button>
            </AddDialog>
        </EditorContainer >






    );
};

export default EditorComponent;
