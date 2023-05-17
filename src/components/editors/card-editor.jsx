import ReactQuill from 'react-quill';
import { CardEditArea, EditorContainer, EditorNavBar, TitleInput } from '../componentStyles';
import { useCallback, useState, useEffect } from 'react';
import { Button, IconButton, Paper, Stack } from '@mui/material';
import debounce from '../../helpers';
import CloseIcon from '@mui/icons-material/Close';

const CardEditorComponent = ({ selectedCard, cardUpdate, selectedDeckIndex, closeCard }) => {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
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
        update({title, front, back});
    };


    return (
        <EditorContainer>
            <EditorNavBar>
                <IconButton onClick={closeCard}>
                    <CloseIcon sx={{ color: 'black' }} />
                </IconButton>

                <TitleInput
                    sx={{ paddingTop: '25px' }}
                    theme='null'
                    placeholder='Título do cartão'
                    value={title ? title : ''}
                    onChange={updateTitle}>
                </TitleInput>

            </EditorNavBar>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Salvar
            </Button>
            <Paper elevation={3}>
                <CardEditArea>
                    <Stack direction='column' spacing={1}>
                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            value={front}
                            onChange={updateFront}
                            placeholder='Frente do cartão'
                        />


                        <ReactQuill
                            modules={modules}
                            formats={formats}
                            value={back}
                            onChange={updateBack}
                            placeholder='Traseira do cartão'
                        />

                    </Stack>
                </CardEditArea>
            </Paper>


        </EditorContainer>

    );


};

export default CardEditorComponent;