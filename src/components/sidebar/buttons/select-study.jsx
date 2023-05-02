import { useState } from "react"
import { AddDialog, SideButton } from "../../componentStyles";
import { Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

function SelectStudy(props) {


    const handleClick = () => {
        props.selectStudy();
    }

   
    return (
        <SideButton>
            <Box sx={{ paddingX: '20px' }}>
                <Button
                    onClick={handleClick}
                    sx={{
                        color: 'white',
                        backgroundColor: 'blue',
                        '&:hover': { bgcolor: 'blue' }
                    }}
                >
                    Estudar
                </Button>
            </Box>
        </SideButton>
    )

}

export default SelectStudy;