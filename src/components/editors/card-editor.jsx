import ReactQuill from 'react-quill';
import { CardEditArea, EditorContainer, EditorNavBar, TitleInput } from '../componentStyles';
import { useCallback, useState, useEffect } from 'react';
import { IconButton, Paper, Stack } from '@mui/material';
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

    const updateFront = useCallback(
        (val) => {
            setFront(val);
            update({ title, front: val, back });
        },
        [title, back]
    );

    const updateBack = useCallback(
        (val) => {
            setBack(val);
            update({ title, front, back: val });
        },
        [title, front]
    )

    const updateTitle = useCallback(
        (txt) => {
            setTitle(txt);
            update({ title: txt, front, back })
        },
        [front, back]
    )


    const update = useCallback(
        debounce(({ title, front, back }) => {
            cardUpdate(id, selectedDeckIndex, { title, front, back });

        }, 1500),
        [id]
    );

  

    useEffect(() => {
        setFront(selectedCard.front || '');
        setBack(selectedCard.back || '');
        setTitle(selectedCard.title || '');
        setId(selectedCard.id || '');
    }, [selectedCard]);


    return (
        <EditorContainer>
            <EditorNavBar> 
                <IconButton onClick={closeCard}>
                    <CloseIcon sx={{color:'black'}}/>  
                </IconButton>
                
                <TitleInput
                    sx={{paddingTop: '25px'}}
                    theme='null'
                    placeholder='Título do cartão'
                    value={title ? title : ''}
                    onChange={(e) => updateTitle(e.target.value)}>
                     
                </TitleInput>
                
            </EditorNavBar>

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