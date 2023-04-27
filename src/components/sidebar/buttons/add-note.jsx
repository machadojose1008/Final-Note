import { Box, Button, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { AddDialog, SideButton } from "../../componentStyles";

function AddNote(props) {
    const {notebooksTitles} = props;
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedNotebookTitle, setSelectedNotebookTitle] = useState('');


    const newNote = () => {
        props.newNote(title, selectedNotebookTitle);
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(true);
        console.log(notebooksTitles);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitle = (txt) => {
        setTitle(txt);
    };

    const handleNotebook =  (event) => {
         setSelectedNotebookTitle(event.target.value);
        console.log(selectedNotebookTitle);
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
                    Nova nota
                </Button>

            </Box>

            <AddDialog open={open} onClose={handleClose} >
                <DialogTitle>Insira um título para a nota</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='titulo'
                        sx={{padding: '0px 0px 15px'}}
                        label='Título da Nota'
                        type='text'
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleTitle(e.target.value)
                        }
                    />
                    <FormControl fullWidth >
                        <InputLabel id='notebook-select-label'>Selecione um caderno</InputLabel>
                        <Select
                            labelId="notebook-select-label"
                            id="notebook-select"
                            label='Selecione um caderno'
                            value={selectedNotebookTitle}
                            onChange={handleNotebook}
                        >
                            {notebooksTitles.map((title) => (
                                <MenuItem key={title} value={title}>{title}</MenuItem>
                            ))} 

                        </Select>
                    </FormControl>

                </DialogContent>
                <Button onClick={handleClose} sx={{ color: 'black', }}>Cancelar</Button>
                <Button onClick={newNote}>Pronto</Button>
            </AddDialog>
        </SideButton>



    );
}

export default AddNote;