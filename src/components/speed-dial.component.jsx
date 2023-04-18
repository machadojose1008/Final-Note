import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { AddingButton, SpeedDialIconButton } from './componentStyles';

const SpeedDialComponent = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // sua função de delete aqui
    };

    const handleEdit = () => {
        // sua função de editar aqui
    };

    const actions = [
        { icon: <DeleteIcon />, name: 'Deletar', onClick: handleDelete },
        { icon: <EditIcon />, name: 'Editar', onClick: handleEdit },
    ];

    return (
        <AddingButton ariaLabel="BotaoSpeedDial"
            icon={<SpeedDialIconButton onClick={handleOpen} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="right" >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                />
            ))}
        </AddingButton>
    );
};

export default SpeedDialComponent;
