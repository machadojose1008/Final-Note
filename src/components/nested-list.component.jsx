import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';
import { DropList, DescIcon } from './componentStyles';

function NestedListComponent({ children }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <DropList onClick={handleClick} dense={true}>
        <DescIcon />
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary='Notas'/>
      </DropList>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>



  );
}

export default NestedListComponent;


