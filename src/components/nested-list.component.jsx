import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';

function NestedList({ children }) {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
      <List>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Notas " />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>
    );
  }

  export default NestedList;