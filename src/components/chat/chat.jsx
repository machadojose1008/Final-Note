import { AppBar, Box, Container, Typography } from "@mui/material";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import InputComponent from "./input";
import { ChatComponentDiv } from "../componentStyles";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from "../../utils/firebase/firebase-config";


const ChatComponent = ({ selectedSharedNote, userEmail }) => {


    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        // Criar o listener para receber atualizações em tempo real
        const unsubscribe = onSnapshot(doc(db, 'sharedNotes', selectedSharedNote.id), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setMensagens(data.mensagens || []);
            }
        });

        // Desativar o listener se o componente for fechado 
        return () => unsubscribe();
    }, [])

    const newMessage = async (message) => {
        const novaMensagem = {
            position: 'left',
            type: 'text',
            title: userEmail,
            text: message
        };

        // Adicionar a nova mensagem ao array mensagens no firestore
        await updateDoc(doc(db, 'sharedNotes', selectedSharedNote.id), {
            mensagens: [...mensagens, novaMensagem]
        });
    };


    return (
        <ChatComponentDiv >
            <Container
                disableGutters={true}
                sx={{
                    border: '1px solid',
                    borderRadius: '10px',
                    display: 'flex',
                    overflow: 'hidden',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    height: "100%",
                    flexDirection: 'column'
                }}
            >

                <AppBar position="static">
                    <Typography
                        variant="h6"
                        component='div'
                        sx={{
                            paddingLeft: '20px'
                        }}
                    >
                        Chat
                    </Typography>
                </AppBar>
                <Box sx={{ height: '95%', overflow: 'auto', maxHeight:'700px', overflowX:'unset'}}>

                    <MessageList
                        className="message-list"
                        lockable={true}
                        toBottomHeight={"100%"}
                        dataSource={mensagens}
                    />
                </Box>

                <InputComponent
                    newMessage={newMessage}
                />
            </Container>
        </ChatComponentDiv>





    );
};

export default ChatComponent
