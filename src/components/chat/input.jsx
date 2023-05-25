import { Box, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';


const InputComponent = ({newMessage}) => {
    const [message, setMessage] = useState('');

    const handleMessage = (txt) => {
        setMessage(txt)
    }

    const sendMessage = async () => {
        await newMessage(message);
    }

    return (
        <Box sx={{ bgcolor: 'lightgray' }}>
            <Input
                placeholder="Digite sua mensagem"
                disableUnderline
                value={message}
                onChange={(e) => handleMessage(e.target.value)}
                sx={{
                    width: '80%', height: '56px', paddingLeft:'10px'
                }}
            />
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton onClick={async () => {
                await sendMessage();
                setMessage('');
            }}>
                <SendIcon />
            </IconButton>
        </Box>

    );
};

export default InputComponent;
