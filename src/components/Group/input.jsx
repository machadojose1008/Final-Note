import { Box, IconButton, Input } from "@mui/material";
import React from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';


const InputComponent = () => {

    return (
        <Box sx={{ bgcolor: 'lightgray' }}>
            <Input
                placeholder="Digite sua mensagem"
                disableUnderline
                sx={{
                    width: '88%', height: '56px', paddingLeft:'10px'
                }}
            />
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton>
                <SendIcon />
            </IconButton>
        </Box>

    );
};

export default InputComponent;
