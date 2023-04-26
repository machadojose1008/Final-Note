import { useState } from "react";
import { DeleteIcon, DropList, NoteText, NotesList, SelectNote } from "../componentStyles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, ListItemText } from "@mui/material";

function SidebarNotebookComponent(props,{children}) {
    const {_index, _notebook, selectedNotebookIndex, selectNotebook, deleteNotebook} = props;

    const [open, setOpen] = useState(false);

    const handleSelectNotebook = () => {
        selectNotebook(_notebook, _index);
    };

    const handleClick = () => {
        setOpen(!open);
    }

    const handleDeleteNotebook = () => {
        if(window.confirm(`Tem certeza que deseja deletar: ${_notebook.title}`)) {
            deleteNotebook(_notebook);
        }
    };



    return (
        <div key={_index}>
            <DropList onClick={handleClick}>
                {open ? <ExpandLess/> : <ExpandMore />}
                <ListItemText primary={_notebook.title} />
            </DropList>

            <Collapse in={open} timeout='auto' unmountOnExit>
                <Box>
                    {children}
                </Box>

            </Collapse>


            {/* <NotesList
                selected={selectedNotebookIndex === _index}
                alignItems="flex-start"
                onClick={handleSelectNotebook}
            >
                <SelectNote onClick={handleSelectNotebook}>
                    <NoteText primary={_notebook.title} />
                </SelectNote>
                <DeleteIcon onClick={handleDeleteNotebook}/>
            </NotesList> */}
        </div>
    );
}

export default SidebarNotebookComponent;