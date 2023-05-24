import React from "react";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const UserList = ({ userId, username }) => {

    return (
        <div key={userId}>
            <List sx={{ width: '100', cursor: 'pointer' }}>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} />
                </ListItemButton>
                <Divider/>
            </List>
        </div>
    );
};

export default UserList;