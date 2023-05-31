import { Box, Button, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { AddDialog, SideButton } from "../../componentStyles";

function AddCard(props) {
    const { decksTitle } = props;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedDeckTitle, setSelectedDeckTitle] = useState('');
    const [keyPressed, setKeyPressed] = useState(false);


    const newCard = () => {
        if (title !== '') {
            if (title.length > 30) {
                alert('Título muito grande');
            } else {
                props.newCard(title, selectedDeckTitle);
                setOpen(false);
                setTitle('');
            }
        } else {
            alert('Nome do Card Vazio');
        }


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

    const handleDeck = (event) => {
        setSelectedDeckTitle(event.target.value);
    }

    useEffect(() => {
        console.log(decksTitle);
        if (keyPressed && title && selectedDeckTitle) {
            newCard();
        }
        setKeyPressed(false);
    }, [keyPressed]);


    return (
        <SideButton>
            <Box sx={{ paddingX: '20px' }}>
                <Button
                    data-testid='novoCard-button'
                    onClick={handleClick}
                    sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        '&:hover': { bgcolor: 'black' }
                    }}
                >
                    Novo Card
                </Button>
            </Box>

            <AddDialog open={open} onClose={handleClose}>
                <DialogTitle>Insira um título para o seu card</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='titulo'
                        sx={{ padding: '0px 0px 15px' }}
                        label='Título do Card'
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
                    <FormControl fullWidth >
                        <InputLabel id='deck-select-label'>Selecione um Deck</InputLabel>
                        <Select
                            labelId="deck-select-label"
                            id="deck-select"
                            label="Selecione um Caderno"
                            value={selectedDeckTitle}
                            onChange={handleDeck}
                        >
                            {decksTitle.map((title) => (
                                <MenuItem key={title} value={title}>{title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <Button onClick={handleClose} sx={{ color: 'black', }}>Cancelar</Button>
                <Button onClick={newCard}>Pronto</Button>
            </AddDialog>
        </SideButton>



    );
}

export default AddCard;