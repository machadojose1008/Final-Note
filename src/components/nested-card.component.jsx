import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText, Collapse } from '@mui/material';
import { useState } from 'react';
import { DropList } from './componentStyles';
import BookIcon from '@mui/icons-material/Book';

function NestedCardComponent({ children }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <DropList onClick={handleClick} dense={true}>
        <BookIcon />
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary='Cards'/>
      </DropList>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </List>



  );
}



export default NestedCardComponent;


