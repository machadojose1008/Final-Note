import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../utils/helpers/helpers';
import { Button, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AddDialog, CustomButtomGroup, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import CloseIcon from '@mui/icons-material/Close';
import DateComponent from './date-component';
import ShareIcon from '@mui/icons-material/Share';
import uploadImage from './image-uploader';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import { SaveAlt } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';

import '../../assets/quill.snow.css';

const EditorComponent = ({ selectedNote, noteUpdate, selectedNotebookIndex, closeNote, shareNote }) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [updateDate, setUpdateDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const quillRef = useRef(null);



    const ExportToPdf = () => {
        const element = document.querySelector('.noteEditor');
        const options = {
            margin: [10, 10, 10, 10],
            filename: 'note.pdf',
            image: { type: 'jpeg', quality: 0.98, includeHtmlInDataUrl: true },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf()
            .set(options)
            .from(element)
            .save();
    };

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

                    <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Title>
                            Título da nota:
                        </Title >
                        <TitleInput
                            placeholder="Título da nota"
                            value={title ? title : ''}
                            onChange={updateTitle}>
                        </TitleInput>
                    </Grid >
                    <Grid item xs={4}>
                        {lastUpdate === '' ? (
                            null
                        ) : (
                            <DateComponent date={lastUpdate} />)}
                    </Grid>


                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={closeNote} data-testid='close-icon'>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                    </Grid>



                </Grid >


            </EditorNavBar >

            <Paper elevation={3}>
                <CustomButtomGroup>

                    <Button
                        sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }}
                        variant="contained" color="primary" startIcon={<SaveAlt />} onClick={ExportToPdf}
                    >
                        <Typography sx={{ fontSize: '8px' }}>Exportar PDF</Typography>
                    </Button>

                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<ImageIcon />} size='small' onClick={handleImageUpload}>
                        <Typography sx={{ fontSize: '8px' }}>
                            Upload Imagem
                        </Typography>
                    </Button>
                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<ShareIcon />} size='small' onClick={handleShare}>
                        <Typography sx={{ fontSize: '8px' }}>Compartilhar</Typography>
                    </Button>
                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<SaveIcon />} size='small' onClick={handleSave}>
                        <Typography sx={{ fontSize: '8px' }}>Salvar</Typography>
                    </Button>
                </CustomButtomGroup>


                <div className='noteEditor'>
                    <ReactQuill
                        ref={quillRef}
                        modules={modules}
                        formats={formats}
                        value={body ? body : ''}
                        onChange={updateBody}
                    />
                </div>

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
