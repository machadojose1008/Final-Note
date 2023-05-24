import { Box } from "@mui/material";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";


const GroupComponent = ({ showGroup }) => {


    return (
        <Box sx={{
            minHeight: '1000px'
        }}>
            <MessageBox
                position={"right"}
                type={"text"}
                title={"Message Box Title"}
                text="Here is a text type message box"
            />
        </Box>




    );
};

export default GroupComponent
{/* <GroupComponentDiv>
            {(showGroup) ? (
                <Container disableGutters={true} sx={{
                    border: '1px solid',
                    borderRadius: '10px',
                    display: 'flex',
                    overflow: 'hidden',
                    paddingLeft: '0px',
                    paddingRight: '0px'
                }}>

                    <SidebarChat>
                        <SearchChatComponent />
                        <Chats />
                    </SidebarChat>



                    <Chat>
                        <ChatComponent  />
                    </Chat>
                </Container>

            ) : (<CircularProgress color="inherit" />)}

        </GroupComponentDiv> */}