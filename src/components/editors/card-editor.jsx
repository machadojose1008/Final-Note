import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../utils/helpers/helpers';
import { CardEditArea, CustomButtomGroup, EditorContainer, EditorNavBar, Title, TitleInput } from '../componentStyles';
import uploadImage from './image-uploader';
import SaveIcon from '@mui/icons-material/Save';
import ImageIcon from '@mui/icons-material/Image';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const CardEditorComponent = ({ selectedCard, cardUpdate, selectedDeckIndex, closeCard }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [ease, setEase] = useState(null);
    const backQuillRef = useRef(null);
    const frontQuillRef = useRef(null);
    const [activeEditor, setActiveEditor] = useState('front');
    const [openDialog, setOpenDialog] = useState(false);


    const handleImageUpload = async (editorName) => {
        setActiveEditor(editorName);



        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => handleFileChange(editorName, event);
        fileInput.click();
    };

    const handleFileChange = (editorName, event) => {
        const file = event.target.files[0];

        uploadImage(file).then((imageUrl) => {
            const range = editorName === 'front' ? frontQuillRef.current.getEditor().getSelection() : backQuillRef.current.getEditor().getSelection();
            if (editorName === 'front') {
                frontQuillRef.current.getEditor().insertEmbed(range ? range.index : 0, 'image', imageUrl);
            } else {
                backQuillRef.current.getEditor().insertEmbed(range ? range.index : 0, 'image', imageUrl);
            }
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


    const updateFront = (frontVal) => {
        setFront(frontVal);
        update({ front: frontVal, back: back, title: title, ease: ease });
    };

    const updateBack = (backVal) => {
        setBack(backVal);
        update({ front: front, back: backVal, title: title, ease: ease });
    };

    const updateTitle = (event) => {
        const titleVal = event.target.value;
        setTitle(titleVal);
        update({ front: front, back: back, title: titleVal, ease: ease });
    };


    const handleEaseChange = (val) => {
        const easeVal = val;
        setEase(easeVal);
        update({front: front, back: back, title: title, ease: val});

    }

    const handleClose = () => {
        setOpenDialog(false);
    }


    const update = useCallback(
        debounce((cardObj) => {
            cardUpdate(id, selectedDeckIndex, cardObj);
        }, 2000),
        [id, selectedDeckIndex, cardUpdate]
    );



    useEffect(() => {
        setFront(selectedCard.front || '');
        setBack(selectedCard.back || '');
        setTitle(selectedCard.title || '');
        setId(selectedCard.id || '');
        setEase(selectedCard.ease);
    }, [selectedCard.id, selectedCard.front, selectedCard.back, selectedCard.title, selectedCard.ease]);


    const handleSave = () => {
        update({ title, front, back });
    };


    return (
        <EditorContainer sx={{ paddingTop: '8px' }}>

            <div>
                <EditorNavBar>

                    <Grid container sx={{ width: '100%' }} >
                        <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Title>
                                Título do cartão:
                            </Title>
                            <div data-testid={title}>
                                <TitleInput
                                    placeholder='Título do cartão'
                                    value={title ? title : ''}
                                    onChange={updateTitle}>
                                </TitleInput>
                            </div>

                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton data-testid="close-button" onClick={closeCard} >
                                <CloseIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                </EditorNavBar>


                <Paper elevation={3}>
                    <CustomButtomGroup>

                        <FormControl variant='standard' sx={{ width: '200px' }}>
                            <InputLabel id='select-ease-label'>Dificuldade do Cartão</InputLabel>
                            <Select
                                labelId='select-ease-label'
                                data-testid='select-ease'
                                id='select-ease'
                                label='Dificuldade do Cartão'
                                value={ease ? ease : ''}
                                onChange={(event) => handleEaseChange(event.target.value)}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton title='Como funciona a dificuldade dos cartões' onClick={() => setOpenDialog(true)}>
                            <HelpRoundedIcon />
                        </IconButton>
                        <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }}
                            variant="contained"
                            color="primary"
                            startIcon={<ImageIcon />}
                            size='small'
                            onClick={() => handleImageUpload('front')}
                        >
                            <Typography sx={{ fontSize: '8px' }}>
                                Upload Imagem frente
                            </Typography>
                        </Button>
                        <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }}
                            variant="contained"
                            color="primary"
                            startIcon={<ImageIcon />}
                            size='small'
                            onClick={() => handleImageUpload('back')}
                        >
                            <Typography sx={{ fontSize: '8px' }}>
                                Upload Imagem traseira
                            </Typography>
                        </Button>
                        <Button sx={{ width: '120px', display: 'flex', justifyContent: 'flex-start' }}
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            size='small'
                            data-testid='save-button'
                            onClick={handleSave}
                        >
                            <Typography sx={{ fontSize: '8px' }}>Salvar</Typography>
                        </Button>
                    </CustomButtomGroup>
                    <CardEditArea>
                        <Stack direction='column' spacing={.6}>
                            <ReactQuill
                                ref={frontQuillRef}
                                modules={modules}
                                formats={formats}
                                value={front ? front : ''}
                                onChange={updateFront}
                                placeholder='Frente do cartão'
                            />
                            <ReactQuill
                                ref={backQuillRef}
                                modules={modules}
                                formats={formats}
                                value={back ? back : ''}
                                onChange={updateBack}
                                placeholder='Traseira do cartão'
                            />
                        </Stack>
                    </CardEditArea>
                </Paper>

                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle sx={{ backgroundColor: '#eeeeee' }}>Dificuldade do cartão</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ fontSize: '16px' }}> A dificuldade do cartão define o tempo que ele vai ser revisado novamente</Typography>
                        <Typography sx={{ fontWeight: 'bold', paddingTop: '20px', paddingBottom: '20px' }}> A Seguinte regra é utilizada:  </Typography>
                        <Typography>Ease 1: Card já pode ser revisado</Typography>
                        <Typography>Ease 2: Card pode ser revisado em 10 minutos</Typography>
                        <Typography>Ease 3: Card pode ser revisado em 4 dias</Typography>
                    </DialogContent>
                </Dialog>

            </div>





        </EditorContainer >

    );


};

export default CardEditorComponent;