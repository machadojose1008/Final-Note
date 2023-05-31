import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Paper, Typography, } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../utils/helpers/helpers';
import { db } from '../../utils/firebase/firebase-config';
import { CustomButtomGroup, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import DateComponent from './date-component';
import { useRef } from 'react';
import uploadImage from './image-uploader';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import { SaveAlt } from '@mui/icons-material';
import html2pdf from 'html2pdf.js';

import '../../assets/quill.snow.css';

const SharedNoteEditor = ({ selectedSharedNoteIndex, sharedNoteUpdate, closeSharedNote, selectChat }) => {
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [updateDate, setUpdateDate] = useState(null);
    const [openned, setOpenned] = useState(null);
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
        console.log(selectedSharedNoteIndex);

        fetchSharedNote(selectedSharedNoteIndex);

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
                    <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Title>
                            Título da nota compartilhada:
                        </Title >
                        <TitleInput
                            placeholder="Título da nota"
                            value={title ? title : ''}
                            onChange={updateTitle}>
                        </TitleInput>
                    </Grid >
                    <Grid item xs={5.5}>
                        {lastUpdate === '' ? (
                            null
                        ) : (
                            <DateComponent date={lastUpdate} />)}
                    </Grid>
                    <Grid item xs={.5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
                        <IconButton data-testid='close-button' onClick={closeSharedNote}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                        <IconButton data-testid='chat-button' onClick={handleSelectChat} size='large'>
                            <ChatIcon sx={{ fontSize: 30 }} size='large'

                            />
                        </IconButton>
                    </Grid>

                </Grid >

            </EditorNavBar >


            <Paper elevation={3}>
                <CustomButtomGroup>
                    <Button
                        sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }}
                        variant="contained" color="primary" startIcon={<SaveAlt />}
                        onClick={ExportToPdf}
                    >
                        <Typography sx={{ fontSize: '8px' }}>Exportar PDF</Typography>
                    </Button>

                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<ImageIcon />} size='small' onClick={handleImageUpload}>
                        <Typography sx={{ fontSize: '8px' }}>
                            Upload Imagem
                        </Typography>
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

        </EditorContainer >






    );
};

export default SharedNoteEditor;
