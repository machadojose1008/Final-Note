import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';
import { DropList } from './componentStyles';

function SidebarButton({ children }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List sx={{
            border: 'solid',
            borderColor: 'black',
            borderWidth: '2px',
            height: '10px',
            borderTopRightRadius: '1em',
            borderTopLeftRadius: '1em',
            borderBottomLeftRadius: '1em',
            borderBottomRightRadius: '1em'

        }}>

            <DropList
                onClick={handleClick}
                dense={true}
            >
                <ListItemText primary='Notas' />
                {open ? <ExpandLess /> : <ExpandMore />}

            </DropList>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </List>



    );
}



export default SidebarButton;


