import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { List, ListItemText, Collapse, Box } from '@mui/material';
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
        <ListItemText primary='Notas' />
      </DropList>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            p: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            bgcolor: "white",
          }}>
          {children}
        </Box>

      </Collapse>
    </List>



  );
}



export default NestedListComponent;


