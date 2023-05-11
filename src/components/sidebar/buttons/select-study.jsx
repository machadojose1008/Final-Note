import { useState } from "react"
import { AddDialog, SideButton } from "../../componentStyles";
import { Box, Button, DialogContent, DialogTitle, TextField } from "@mui/material";

function SelectStudy(props) {


    const handleClick = () => {
        props.selectStudy();
    }

   
    return (
        <SideButton>
            <Box sx={{ paddingX: '20px', paddingY:'10px' }}>
                <Button
                    onClick={handleClick}
                    variant="contained"
                    color="primary"
                >
                    Revisar
                </Button>
            </Box>
        </SideButton>
    )

}

export default SelectStudy;