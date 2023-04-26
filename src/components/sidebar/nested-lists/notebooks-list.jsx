import { Box, Collapse, List, ListItemText } from "@mui/material";
import { DescIcon, DropList } from "../../componentStyles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

function NestedNotebooksComponent({children}) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <DropList onClick={handleClick} dense={true}>
                <DescIcon />
                {open ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary='Notebooks' />
            </DropList>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box>
                    {children}
                </Box>
            </Collapse>
        </List>
    );
}

export default NestedNotebooksComponent;