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
    const [currentCardPosition, setCurrentCardPosition] = useState({ deckPosition: null, cardPosition: null })

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
        const filteredCards = await filterCards(deck);
        if (filteredCards.length === 0) {
            alert('Nenhum card para revisar nesse deck no momento');
        } else {
            setCards(filteredCards);
            setOpenModal(true);
            const deckPosition = await findDeckPosition(decks, deck.id);
            setCurrentDeckIndex(deckPosition);
        }


    };

    const handleReviewAll = async () => {
        const revisionCards = [];

        await Promise.all(
            decks.map(async (deck) => {
                const filteredCards = await filterCards(deck);
                filteredCards.map((card) => {
                    revisionCards.push({ ...card });
                });

            })
        );
        if (revisionCards.length === 0) {
            alert('Nenhum card para revisão no momento!')
        } else {
            setCards(revisionCards);
            setOpenModal(true);
        }


    };


    const findCardInDeck = async (cardId) => {
        const position = { deckPosition: null, cardPosition: null };

        await Promise.all(
            decks.map(async (deck) => {
                await Promise.all(
                    deck.cards.map(async (card) => {
                        if (card.id === cardId) {
                            position.deckPosition = await findDeckPosition(decks, deck.id);
                            position.cardPosition = await findCardPosition(deck.cards, card.id);
                        }
                    })
                );
            })
        );
        setCurrentCardPosition(position);
        return position;
    };

    const handleNextCard = async (newEase, cardId) => {
        const currentPosition = await findCardInDeck(cardId);
        const deckPosition = currentPosition.deckPosition;
        const cardPosition = currentPosition.cardPosition;

        if (deckPosition !== null && cardPosition !== null) {
            const updatedDecks = [...decks];
            updatedDecks[deckPosition].cards[cardPosition].ease = newEase;
            updatedDecks[deckPosition].cards[cardPosition].reviewDate = Timestamp.now();


            const nextCardIndex = currentCardIndex + 1;

            if (nextCardIndex < cards.length) {
                setCurrentCardIndex(nextCardIndex);
                setShowBack(false);
            } else {
                handleCloseModal();
            }
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
                    <Grid item xs={9}>
                        <Grid key='deckName'>
                            <h1>Decks</h1>
                            <Typography sx={{ fontStyle: 'italic', color: 'red', fontWeight: 'bold' }}>Cards em Vermelho precisam de revisão</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={3} sx={{ dispaly: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Button onClick={handleReviewAll} title="Revisa todos os cards que já precisam de revisão." variant="contained" color="primary">
                            <Typography>Revisar Tudo</Typography>
                        </Button>

                    </Grid>
                    {decks.map((deck) => {
                        if (deck.cards.length === 0) {
                            return (
                                <Grid item xs={2.4} key={deck.id}>
                                    <Card raised sx={{ maxWidth: '300px', maxHeight: '320px', padding: '5px', minWidth: '300px' }}>
                                        <CardContent >
                                            <Typography variant="h4" color='black' gutterBottom noWrap={true} sx={{
                                                minWidth: '290px', overflow: 'auto', overflowY: 'unset',
                                                display: '-webkit-box',
                                                '-webkit-line-clamp': 1,
                                                '-webkit-box-orient': 'vertical'
                                            }}>
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
                                                        {(card.ease) === 1 ? (
                                                            <Typography color='red' sx={{
                                                                overflow: 'hidden',
                                                                display: '-webkit-box',
                                                                '-webkit-line-clamp': 1,
                                                                '-webkit-box-orient': 'vertical'
                                                            }}>{card.title} </Typography>
                                                        ) : (
                                                            <Typography>{card.title}</Typography>
                                                        )}


                                                    </li>
                                                </ul>
                                            ))}
                                        </StyledCardContent>
                                        {deck.cards.map((card) => {
                                            if (card.ease === 1) (
                                                <Typography color='red'>Cards precisam de revisão</Typography>
                                            )
                                        })}
                                        <CardActions sx={{ position: 'absolute' }}>
                                            <Button title="Revisar todos os cards que precisam de revisão do deck"
                                                variant="contained"
                                                color="primary"
                                                size='small'
                                                onClick={() => handleReviewDeck(deck)}
                                            >
                                                Revisar Deck
                                            </Button>
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
                                                                maxWidth: 800,
                                                                minWidth: 800,
                                                                maxHeight: 800,
                                                                minHeight: 300,
                                                                margin: 'auto',
                                                                overflow:'auto',
                                                                overflowX:'unset'

                                                            }}
                                                        >
                                                            <CardHeader title={cards[currentCardIndex].title} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                            <CardContent sx={{ display: "flex", justifyContent: 'space-around', alignContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                                <Typography
                                                                    variant="h5"
                                                                    component="h2" gutterBottom
                                                                    sx={{ paddingBottom: '10px', overflow: 'auto', maxWidth: '600px', maxHeight: '400px' }}
                                                                    dangerouslySetInnerHTML={{ __html: cards[currentCardIndex].front }}
                                                                />

                                                                <Divider />
                                                                {showBack ? (
                                                                    <Typography
                                                                        variant="h5"
                                                                        component="h2"
                                                                        gutterBottom
                                                                        sx={{ paddingTop: '10px', overflow: 'auto', maxWidth: '600px', maxHeight: '400px' }}
                                                                        dangerouslySetInnerHTML={{ __html: cards[currentCardIndex].back }}
                                                                    />


                                                                ) : ''}

                                                                {showBack && (
                                                                    <ButtonContainer sx={{ width: '500px' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            onClick={() => handleNextCard(1, cards[currentCardIndex].id)}
                                                                        >
                                                                            Difícil - 1 min
                                                                        </Button>

                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            sx={{ display: 'block' }}
                                                                            onClick={() => handleNextCard(2, cards[currentCardIndex].id)}
                                                                        >
                                                                            Médio - 10 min
                                                                        </Button>

                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            onClick={() => handleNextCard(3, cards[currentCardIndex].id)}
                                                                        >
                                                                            Fácil - 4 dias
                                                                        </Button>


                                                                    </ButtonContainer>
                                                                )}
                                                                {!showBack && (
                                                                    <Button variant="contained" color="primary" size="small" sx={{ maxWidth: '200px' }} onClick={handleShowBack}>
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