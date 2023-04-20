import React from 'react';
import { removeHTMLTags } from '../../helpers';
import { NotesList, SelectNote, NoteText, DeleteIcon } from '../componentStyles'


function SidebarCardComonent(props) {
    const { _index, _card, selectedCardIndex, selectCard, deleteCard } = props;

    const handleSelectCard = () => {
        selectCard(_card, _index);
    };

    const handleDeleteCard = () => {
        if (window.confirm(`Tem certeza que deseja deletar: ${_card.title}`)) {
            deleteCard(_card);
        }
    };

    return (
        <div key={_index}>
            <NotesList
                selected={selectedCardIndex === _index}
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

export default SidebarCardComonent;
