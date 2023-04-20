import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { AddDialog, SideButton } from "../componentStyles";

function AddNote(props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');


    const newNote = () => {
        props.newNote(title);
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitle = (txt) => {
        setTitle(txt);
    };


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
                    Nova nota
                </Button>

            </Box>

            <AddDialog open={open} onClose={handleClose}>
                <DialogTitle>Insira um título para a nota</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='titulo'
                        label='Título da Nota'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleTitle(e.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose} sx={{color:'black', }}>Cancelar</Button>
                <Button onClick={newNote}>Pronto</Button>
            </AddDialog>
        </SideButton>
            


    );
}

export default AddNote;