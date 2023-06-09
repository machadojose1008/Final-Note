import { useState } from "react";
import { Box, Button, Collapse, IconButton, List } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExapandMoreIcon from '@mui/icons-material/ExpandMore';

const SideBarButton = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  return (
    <Box>
      <List sx={{}}>
        <Button
          onClick={handleClick}
          sx={{
            color: "white",
            bgcolor: "black",
            disableElevation: true,
            "&:hover": {
              bgcolor: "black",
            },
          }}
        >
          Criar
          <IconButton
            sx={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            size="small"
            onClick={handleClick}
          >
            {open ? <ExpandLessIcon sx={{ color: 'white' }} /> : <ExapandMoreIcon sx={{ color: 'white' }} />}
          </IconButton>
        </Button>
        <Collapse in={open} sx={{ top: "100%" }}>
          <Box sx={{display: 'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center', }}
          >
            {children}
          </Box>
        </Collapse>
      </List>
    </Box>

  );
};

export default SideBarButton;