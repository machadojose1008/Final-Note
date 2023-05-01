import React from 'react';
import { removeHTMLTags } from '../../helpers';
import { NotesList, SelectNote, NoteText, DeleteIcon } from '../componentStyles'


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
                    <NoteText primary={_card.title}
                        secondary={removeHTMLTags(_card.front.substring(0, 30)) + '...'}
                    />
                </SelectNote>
                <DeleteIcon  onClick={handleDeleteCard} />
            </NotesList>
        </div >
    );
}

export default SidebarCardComponent;
