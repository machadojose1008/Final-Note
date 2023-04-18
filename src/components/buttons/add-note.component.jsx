import { Box, Button } from "@mui/material";

const AddNote = () => {

    const handleClick = () => {
        console.log('adicionar nota')
    }

    return (
        <Box sx={{paddingX: '20px'}}>
            <Button
                onClick={handleClick}
                sx={{
                    color: 'white',
                    backgroundColor: 'black',
                    '&:hover': { bgcolor: 'black' }
                }}
            >
                Adicionar nota
            </Button>

        </Box>


    );
}

export default AddNote;