import { useState, useEffect } from "react";
import { AddDialog, SideButton } from "../../componentStyles";
import { Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

function AddNotebook(props) {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [keyPressed, setKeyPressed] = useState(false);

    const newNotebook = () => {
        if (title !== '') {
            if (title.length > 30) {
                alert('Título muito grande');
            } else {
                props.newNotebook(title);
                setOpen(false);
                setTitle('');
            }

        }else{
            alert('Nome do Carderno Vazio!');
        }

    };

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitle = (txt) => {
        setTitle(txt);
    };

    useEffect(() => {
        if (keyPressed && title) {
            newNotebook();
        }
        setKeyPressed(false);
    }, [keyPressed]);


    return (
        <SideButton>
            <Box sx={{ paddingX: '20px' }}>
                <Button
                    onClick={handleClick}
                    sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        '&:hover': { bgcolor: 'black' }
                    }}
                >
                    Novo Notebook
                </Button>
            </Box>

            <AddDialog open={open} onClose={handleClose} >
                <DialogTitle>Insira o nome do Notebook</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id='Nome'
                        sx={{ padding: '0px 0px 15px' }}
                        label='Nome do Notebook'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleTitle(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                setKeyPressed(true);
                            }
                        }}
                    />
                </DialogContent>
                <Button onClick={handleClose} sx={{ color: 'black', }}>Cancelar</Button>
                <Button onClick={newNotebook}>Pronto</Button>
            </AddDialog>
        </SideButton>
    )

}

export default AddNotebook;