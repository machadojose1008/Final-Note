import { TextField } from "@mui/material";
import React from "react";
import UserList from "./userlist";

const SearchChatComponent = () => {

    return (
        <div>
            <TextField
                id='search'
                label='Buscar usuário'
                type="search"
                variant="filled"
                sx={{
                    width: '100%',
                    paddingRight: '10px',
                    borderRadius: '10px'
                }}
            />
            <UserList userId={1} username={'carlos'} />
        </div>


    );
};

export default SearchChatComponent;