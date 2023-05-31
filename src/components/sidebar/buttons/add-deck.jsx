import { useState, useEffect } from "react"
import { AddDialog, SideButton } from "../../componentStyles";
import { Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

function AddDeck(props) {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [keyPressed, setKeyPressed] = useState(false);

    const newDeck = () => {
        if (title !== '') {
            if (title.length > 30) {
                alert('Título do deck muito grande!');
            } else {
                props.newDeck(title);
                setOpen(false);
                setTitle('');
            }
        } else {
            alert('Nome do Deck Vazio!');
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
            newDeck();
        }
        setKeyPressed(false);
    }, [keyPressed]);

    return (
        <SideButton>
            <Box sx={{ paddingX: '20px' }}>
                <Button
                    data-testid='addDeck-button'
                    onClick={handleClick}
                    sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        '&:hover': { bgcolor: 'black' }
                    }}
                >
                    Novo Baralho
                </Button>
            </Box>

            <AddDialog open={open} onClose={handleClose} >
                <DialogTitle>Insira um título para seu baralho</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id='Nome'
                        sx={{ padding: '0px 0px 15px' }}
                        label='Título do baralho'
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
                <Button onClick={newDeck}>Pronto</Button>
            </AddDialog>
        </SideButton>
    )

}

export default AddDeck;