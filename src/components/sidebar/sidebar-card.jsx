import { ListItemText } from '@mui/material';
import React from 'react';
import { DeleteIcon, NotesList, SelectNote } from '../componentStyles';


function SidebarCardComponent(props) {
    const { _cardIndex, _card, deckIndex, selectedCardIndex, selectCard, deleteCard } = props;

    const handleSelectCard = () => {
        selectCard(_card, deckIndex, _cardIndex);
    };

    const handleDeleteCard = () => {
        if (window.confirm(`Tem certeza que deseja deletar: ${_card.title}`)) {
            deleteCard(_card, deckIndex);
        }
    };

    return (
        <div key={_cardIndex}>
            <NotesList
                selected={selectedCardIndex === _cardIndex}
                alignItems='flex-start'
                onClick={handleSelectCard}
            >
                <SelectNote onClick={handleSelectCard}>
                    <ListItemText 
                        primary={_card.title}
                        primaryTypographyProps={{fontSize: 14, fontWeight:'medium'}}
                    />
                </SelectNote>
                <DeleteIcon  onClick={handleDeleteCard} />
            </NotesList>
        </div >
    );
}

export default SidebarCardComponent;
