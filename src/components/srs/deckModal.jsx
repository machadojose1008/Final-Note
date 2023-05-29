import { Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const DeckModal = (props) => {
    const { deck } = props;
    const [currentDeck, setCurrentDeck] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);
    const [open, setOpen] = useState(false);
    const [cards, setCards] = useState(null);
    const filteredCards = [];


    const filterCards = async (deck) => {
        deck.cards.map((card) => {
            if (card.ease === 1) {
                filteredCards.push({ ...card });
            };
        });
        setCurrentCardIndex(0);
        setCards(filteredCards);
        setOpen(true);
        return filteredCards;
    }


    const handleClose = () => {
        console.log('fechar');
    };

    useEffect(() => {
        filterCards(deck);
        console.log(open);
    }, []);

    const handleShowBack = () => {
        setShowBack(true);
    };


    const handleNextCard = (newEase) => {
        const newCards = currentDeck.map((card, index) => {
            if (index === currentCardIndex) {
                return { ...card, ease: newEase };
            }
            return card;
        });
        const nextCardIndex = currentCardIndex + 1;
        if (nextCardIndex < currentDeck.length) {
            setCurrentDeck(newCards.slice(nextCardIndex).filter((card) => card.ease === 1));
            setCurrentCardIndex(nextCardIndex);
            setShowBack(false);
        } else {
            handleClose();
        }
    };

    return (

        <div>
            <Modal
                open={open}
            >
                {filteredCards.length > 0 ? (
                        <Box >
                            <Typography id="transition-modal-title" v ariant="h6" component="h2">
                                {filteredCards[0].title}
                            </Typography>
                        </Box>

                    ) : null}
            </Modal>

            
                    
            


        </div>
    );

};

export default DeckModal;