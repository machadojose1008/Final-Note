import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Fade, Grid, Modal, Typography } from "@mui/material";
import { ButtonContainer, StudyComponentDiv, StyledCardContent } from "../componentStyles";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { findCardPosition, findDeckPosition } from "../../helpers";
import { removeHTMLTags } from "../../helpers";



const SrsComponent = (props) => {

    const { decks } = props

    const [openModal, setOpenModal] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [currentDeckIndex, setCurrentDeckIndex] = useState(null);
    const [cards, setCards] = useState([]);
    const [showSrs, setShowSrs] = useState(false);

    const setReviewDate = (reviewDate) => {
        // Atualiza a data do card do formato em milisegundos do firestore para o formato date do javascript
        const timestamp = reviewDate;
        const date = timestamp.toDate();
        return date;
    };

    const updateCards = async (cards) => {
        const updatedCards = [];
        // Função que roda no inicio do componente atualizando o ease em todos os decks do usuário
        for (const card of cards) {
            const now = new Date();
            const reviewDate = setReviewDate(card.reviewDate);
            const difference = Math.floor((now - reviewDate) / 1000);
            let updatedCard = card;

            if (card.ease === 2 && difference > 600) {
                updatedCard = { ...card, ease: 1 };
            } else if (card.ease === 3 && difference > 345600) {
                updatedCard = { ...card, ease: 1 };
            }

            updatedCards.push({
                ...updatedCard,
            });
        }
        setShowSrs(true);
        return (updatedCards);
    };



    useEffect(() => {
        // Atualização dos eases nos decks de acordo com o tempo da última revisão
        decks.map(async (deck) => {
            const updatedCards = await updateCards(deck.cards);
            deck.cards = updatedCards;
        });



        console.log();

    }, [decks]);

    const filterCards = async (deck) => {
        const filteredCards = [];
        deck.cards.map((card) => {
            if (card.ease === 1) {
                filteredCards.push({ ...card });
            };
        });
        setCurrentCardIndex(0);
        await setCards(filteredCards);
       
        return filteredCards;
    }

    const updateAfterReview = (decks) => {
        props.updateAfterReview(decks);
    }

    const handleReviewDeck = async (deck) => {
        // Quando abrir o modal 
        const filteredCards = await filterCards(deck);
        setCards(filteredCards);
        setOpenModal(true);
        const deckPosition = await findDeckPosition(decks, deck.id);
        setCurrentDeckIndex(deckPosition);
    


    };

    const handleNextCard = async (newEase, cardId, currentDeck) => {
    

        const cardIndex = await findCardPosition(decks[currentDeckIndex].cards, cardId);

        decks[currentDeckIndex].cards[cardIndex].ease = newEase;
        decks[currentDeckIndex].cards[cardIndex].reviewDate = Timestamp.now();

         const nextCardIndex = currentCardIndex + 1;

        if (nextCardIndex < cards.length) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowBack(false);
        } else {
           handleCloseModal();
        }
    };

    const handleCloseModal = () => {
       setOpenModal(false);
       updateAfterReview(decks);
    
    }

    const handleShowBack = () => {
        setShowBack(true);
    }

    return (

        <StudyComponentDiv>
            {(showSrs) ? (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid key='deckName'>
                            <h1>Decks</h1>
                        </Grid>
                    </Grid>
                    {decks.map((deck) => {
                        if (deck.cards.length === 0) {
                            return (
                                <Grid item xs={2.4} key={deck.id}>
                                    <Card raised sx={{ maxWidth: '300px', padding: '5px', minWidth: '200px' }}>
                                        <CardContent >
                                            <Typography variant="h4" color='black' gutterBottom>
                                                {deck.title}
                                            </Typography>
                                            <Typography sx={{ display: 'center' }}>Nenhum card criado!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={2.4}>
                                    <Card raised sx={{ maxWidth: '300px', padding: '5px', maxHeight: '320px', paddingBottom: '80px' }}>
                                        <Typography variant="h4" color='black' sx={{ position: 'absolute', backgroundColor: 'white', minWidth: '200px' }} gutterBottom>
                                            {deck.title}
                                        </Typography>
                                        <StyledCardContent >
                                            {deck.cards.map((card) => (
                                                <ul>
                                                    <li>
                                                        {card.title} {card.ease}
                                                    </li>
                                                </ul>
                                            ))}
                                        </StyledCardContent>
                                        <CardActions sx={{ position: 'absolute' }}>
                                            <Button variant="contained" color="primary" size='small' onClick={() => handleReviewDeck(deck)}>Revisar Deck</Button>
                                        </CardActions>

                                        {openModal ? (
                                            <Modal
                                                open={openModal}
                                                onClose={handleCloseModal}
                                                closeAfterTransition
                                               
                                                sx={{
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    
                                                }}
                                            >

                                                {cards.length > 0 ? (
                                                    <Fade in={openModal}>
                                                        <Card
                                                            sx={{
                                                                maxWidth: 600,
                                                                minWidth:600,
                                                                minHeight: 300,
                                                                margin: 'auto',
                                                                
                                                            }}
                                                        >
                                                            <CardHeader title={cards[currentCardIndex].title} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}/>
                                                            <CardContent sx={{ display: "flex", justifyContent: 'space-around', alignContent:'center', flexDirection:'column', alignItems:'center'}}>
                                                                <Typography variant="h5" component="h2" gutterBottom sx={{paddingBottom: '10px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                    {removeHTMLTags(cards[currentCardIndex].front)}
                                                                </Typography>
                                                                <Divider />
                                                                <Typography variant="h5" component="h2" gutterBottom sx={{paddingTop: '10px'}}>
                                                                    {showBack ? removeHTMLTags(cards[currentCardIndex].back) : ''}
                                                                </Typography>
                                                                {showBack && (
                                                                    <ButtonContainer>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={() => handleNextCard(3, cards[currentCardIndex].id, deck)}
                                                                        >
                                                                            Fácil
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={() => handleNextCard(2, cards[currentCardIndex].id, deck)}
                                                                        >
                                                                            Médio
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={() => handleNextCard(1, cards[currentCardIndex].id, deck)}
                                                                        >
                                                                            Difícil
                                                                        </Button>
                                                                    </ButtonContainer>
                                                                )}
                                                                {!showBack && (
                                                                    <Button variant="contained" color="primary" size="small" sx={{maxWidth: '200px'}} onClick={handleShowBack}>
                                                                        Mostrar resposta
                                                                    </Button>
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    </Fade>

                                                ) : null}
                                            </Modal>

                                        ) : null}

                                    </Card>

                                </Grid>
                            )
                        }
                    })}
                </Grid>
            ) : <CircularProgress color="inherit" />}

        </StudyComponentDiv>






    );
};

export default SrsComponent;