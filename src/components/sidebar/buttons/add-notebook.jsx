import { useState } from "react"
import { AddDialog, SideButton } from "../../componentStyles";
import { Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

function AddNotebook(props) {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const newNotebook = () => {
        props.newNotebook(title);
        setOpen(false);
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
                        margin=""
                        id='Nome'
                        sx={{ padding: '0px 0px 15px' }}
                        label='Nome do Notebook'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleTitle(e.target.value)}
                    />
                </DialogContent>
                <Button onClick={handleClose} sx={{ color: 'black', }}>Cancelar</Button>
                <Button onClick={newNotebook}>Pronto</Button>
            </AddDialog>
        </SideButton>
    )

}

export default AddNotebook;