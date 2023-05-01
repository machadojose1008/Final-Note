import { Box, Button, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { AddDialog, SideButton } from "../../componentStyles";

function AddCard(props) {
    const {decksTitle} = props;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedDeckTitle, setSelectedDeckTitle] = useState('');


    const newCard = () => {
        props.newCard(title, selectedDeckTitle);
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

    const handleDeck = (event) => {
        setSelectedDeckTitle(event.target.value);
    }


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
                        sx={{padding: '0px 0px 15px'}}
                        label='Título do Card'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleTitle(e.target.value)}
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
                <Button onClick={handleClose} sx={{color:'black', }}>Cancelar</Button>
                <Button onClick={newCard}>Pronto</Button>
            </AddDialog>
        </SideButton>
            


    );
}

export default AddCard;