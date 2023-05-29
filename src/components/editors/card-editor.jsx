import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import { CardEditArea, CustomButtomGroup, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import uploadImage from './image-uploader';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import ShareIcon from '@mui/icons-material/Share';

const CardEditorComponent = ({ selectedCard, cardUpdate, selectedDeckIndex, closeCard }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
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


    const updateFront = (frontVal) => {
        setFront(frontVal);
        update({ front: frontVal, back: back, title: title });
    };

    const updateBack = (backVal) => {
        setBack(backVal);
        update({ front: front, back: backVal, title: title });
    };

    const updateTitle = (event) => {
        const titleVal = event.target.value;
        setTitle(titleVal);
        update({ front: front, back: back, title: titleVal });
    };


    const update = useCallback(
        debounce((cardObj) => {
            cardUpdate(id, selectedDeckIndex, cardObj);
        }, 1500),
        [id, selectedDeckIndex, cardUpdate]
    );



    useEffect(() => {
        setFront(selectedCard.front || '');
        setBack(selectedCard.back || '');
        setTitle(selectedCard.title || '');
        setId(selectedCard.id || '');
    }, [selectedCard.id, selectedCard.front, selectedCard.back, selectedCard.title]);


    const handleSave = () => {
        update({ title, front, back });
    };


    return (
        <EditorContainer sx={{ paddingTop: '8px' }}>

            <EditorNavBar>

                <Grid container sx={{ width: '100%' }} >
                    <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Title>
                            Título do card:
                        </Title>
                        <TitleInput
                            placeholder='Título do cartão'
                            value={title ? title : ''}
                            onChange={updateTitle}>
                        </TitleInput>
                    </Grid>
                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={closeCard}>
                            <CloseIcon sx={{ color: 'black' }} />
                        </IconButton>
                    </Grid>
                </Grid>

            </EditorNavBar>




            <Paper elevation={3}>
                <CustomButtomGroup>
                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<ImageIcon />} size='small' onClick={handleImageUpload}>
                        <Typography sx={{ fontSize: '8px' }}>
                            Upload Imagem
                        </Typography>
                    </Button>
                    <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }} variant="contained" color="primary" startIcon={<SaveIcon />} size='small' onClick={handleSave}>
                        <Typography sx={{ fontSize: '8px' }}>Salvar</Typography>
                    </Button>
                </CustomButtomGroup>
                <CardEditArea>
                    <Stack direction='column' spacing={.6}>
                        <ReactQuill
                            ref={quillRef}
                            modules={modules}
                            formats={formats}
                            value={front}
                            onChange={updateFront}
                            placeholder='Frente do cartão'
                        />
                        <ReactQuill
                            ref={quillRef}
                            modules={modules}
                            formats={formats}
                            value={back}
                            onChange={updateBack}
                            placeholder='Traseira do cartão'
                        />
                    </Stack>
                </CardEditArea>
            </Paper>


        </EditorContainer >

    );


};

export default CardEditorComponent;