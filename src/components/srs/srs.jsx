import { Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Fade, Grid, Modal, Typography } from "@mui/material";
import { ButtonContainer, StudyComponentDiv, StyledCardContent } from "../componentStyles";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { findCardPosition, findDeckPosition } from "../../utils/helpers/helpers";
import HelpIcon from '@mui/icons-material/Help';



const SrsComponent = (props) => {


    const { decks } = props

    const [openModal, setOpenModal] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [currentDeckIndex, setCurrentDeckIndex] = useState(null);
    const [cards, setCards] = useState([]);
    const [showSrs, setShowSrs] = useState(false);
    const [currentCardPosition, setCurrentCardPosition] = useState({ deckPosition: null, cardPosition: null })
    const [openDialog, setOpenDialog] = useState(false);

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
        // Filtra os cards que precisam de revisão pelo ease
        const filteredCards = [];
        deck.cards.map((card) => {
            if (card.ease === 1) {
                filteredCards.push({ ...card });
            };
        });
        setCurrentCardIndex(0);
        setCards(filteredCards);

        return filteredCards;
    }

    const updateAfterReview = (decks) => {
        props.updateAfterReview(decks);
    }

    const handleReviewDeck = async (deck) => {
        // Chama a revisão dos cards de um deck
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
        // Chama a revisão de todos os cards dos decks
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

    const handleHow = () => {
        setOpenDialog(true);

    }

    const closeHowTo = () => {
        setOpenDialog(false);
    }


    const findCardInDeck = async (cardId) => {
        // acha a posição do card nos decks
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
        // atualiza o card aberto no dialog e chama o próximo card que precisa de revisão
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
                <Grid container spacing={1} key='srs'>
                    <Grid item xs={8} key='title'>
                        <Grid key='deckName'>
                            <h1>Baralhos</h1>
                            <Typography sx={{ fontStyle: 'italic', color: 'red', fontWeight: 'bold' }}>Cartões em Vermelho precisam de revisão</Typography>
                        </Grid>

                    </Grid>
                    <Grid key='ComoFunciona-button' item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleHow}
                            data-testid='howto-button'
                            title='Como funciona a revisão SRS'
                            variant="outlined"
                            color="primary"
                            sx={{ maxWidth: '100%' }}
                            endIcon={<HelpIcon />}
                        >
                            Como Funciona
                        </Button>
                    </Grid>

                    <Dialog data-testid='dialog-test' open={openDialog} onClose={closeHowTo}>
                        <DialogTitle sx={{fontWeight:'bold'}}>Sistema de Estudo por Repetição Espaçada</DialogTitle>
                        <DialogContent>
                            <p>
                                O sistema de estudo por repetição espaçada é uma técnica que visa otimizar a retenção de informações durante o processo de aprendizado. Ele se baseia no princípio de que revisar o conteúdo em intervalos de tempo espaçados, ao longo do tempo, aumenta a eficácia da aprendizagem.
                            </p>
                            <p>
                                O funcionamento do sistema de estudo por repetição espaçada envolve algumas etapas:
                            </p>
                            <ol>
                                <li>
                                    Estabelecimento de intervalos: Ao estudar um novo conteúdo, o sistema determina um intervalo inicial para a revisão. Esse intervalo pode variar dependendo da complexidade e dificuldade do material.
                                </li>
                                <li>
                                    Revisão periódica: Após o estudo inicial, o sistema programa revisões periódicas do conteúdo. O intervalo entre as revisões aumenta gradualmente com o tempo, à medida que o material é consolidado na memória.
                                </li>
                                <li>
                                    Avaliação do desempenho: Durante as revisões, o sistema avalia o desempenho do usuário, identificando quais informações foram retidas com sucesso e quais necessitam de revisão adicional.
                                </li>
                                <li>
                                    Ajuste dos intervalos: Com base no desempenho do usuário, o sistema ajusta os intervalos de revisão para cada item de conteúdo. Os itens que são facilmente lembrados têm intervalos maiores, enquanto os itens mais desafiadores têm intervalos menores.
                                </li>
                                <li>
                                    Repetição personalizada: O sistema adapta as revisões de acordo com as necessidades individuais de cada usuário. Itens mais difíceis ou que foram esquecidos são revisados com mais frequência, enquanto itens mais fáceis são revisados com menos frequência.
                                </li>
                            </ol>
                            <p>
                                O objetivo final do sistema de estudo por repetição espaçada é maximizar a retenção de informações a longo prazo, otimizando o tempo de estudo e minimizando o esquecimento. Ele se baseia nos princípios da curva do esquecimento e do espaçamento ótimo, promovendo uma aprendizagem mais eficiente e duradoura.
                            </p>
                        </DialogContent>
                    </Dialog>




                    <Grid key='revisarButton' item xs={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleReviewAll}
                            data-testid='botao revisao'
                            title="Revisa todos os cartões que já precisam de revisão."
                            variant="contained"
                            color="primary"
                            sx={{ maxWidth: '200px' }}

                        >

                            Revisar Tudo
                        </Button>

                    </Grid>
                    {decks.map((deck) => {
                        if (deck.cards.length === 0) {
                            return (
                                <Grid item xs={2.4} key={deck.id}>
                                    <Card raised key={deck.id} sx={{ maxWidth: '300px', maxHeight: '320px', padding: '5px', minWidth: '300px' }}>
                                        <CardContent >
                                            <Typography key={deck.id} variant="h4" color='black' gutterBottom noWrap={true} sx={{
                                                minWidth: '290px', overflow: 'auto', overflowY: 'unset',
                                                display: 'WebkitBox',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {deck.title}
                                            </Typography>
                                            <Typography sx={{ display: 'center' }}>Nenhum cartão criado!</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid item xs={2.4}>
                                    <Card raised sx={{ maxWidth: '300px', padding: '5px', maxHeight: '320px', paddingBottom: '80px' }}>
                                        <Typography variant="h4" key={deck.id} color='black' sx={{ position: 'absolute', backgroundColor: 'white', minWidth: '250px' }} gutterBottom>
                                            {deck.title}
                                        </Typography>
                                        <StyledCardContent >
                                            {deck.cards.map((card) => (
                                                <ul key={card.id}>
                                                    <li key={card.id}>
                                                        {(card.ease) === 1 ? (
                                                            <Typography
                                                                key={card.id}
                                                                color='red'
                                                                sx={{
                                                                    overflow: 'hidden',
                                                                    display: 'WebkitBox',
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: 'vertical'
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
                                                <Typography key={card.id} color='red'>Cartões que precisam de revisão</Typography>
                                            )

                                        })}
                                        <CardActions sx={{ position: 'absolute' }}>
                                            <Button title="Revisar todos os cards que precisam de revisão do baralho"
                                                variant="contained"
                                                color="primary"
                                                size='small'
                                                onClick={() => handleReviewDeck(deck)}
                                            >
                                                Revisar Baralho
                                            </Button>
                                        </CardActions>

                                        {openModal ? (
                                            <Modal
                                                data-testid='modal'
                                                open={openModal}
                                                onClose={handleCloseModal}
                                                closeAfterTransition
                                                BackdropComponent={(props) => {
                                                    <div
                                                        {...props}
                                                        style={{...props.style, backgroundColor:'rgba(0,0,0,0.1)',
                                                    }}
                                                    />
                                                }}
                       

                                                sx={{
                                                    display: "flex",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor:'rgb(0 ,0 ,0 , 0.1)'
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
                                                                overflow: 'auto',
                                                                overflowX: 'unset'

                                                            }}
                                                        >
                                                            <CardHeader title={cards[currentCardIndex].title} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#cccccc' }} />
                                                            <CardContent sx={{ display: "flex", justifyContent: 'space-around', alignContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                                <Typography
                                                                    variant="h5"
                                                                    component="h2"
                                                                    gutterBottom
                                                                    sx={{ paddingBottom: '10px', overflow: 'auto', maxWidth: '600px', maxHeight: '400px' }}
                                                                    dangerouslySetInnerHTML={{ __html: cards[currentCardIndex].front }}
                                                                />
                                                                <Divider sx={{ width: '100%' }} />
                                                                {showBack ? (
                                                                    <Typography
                                                                        data-testid='back'
                                                                        variant="h5"
                                                                        component="h2"
                                                                        gutterBottom
                                                                        sx={{ paddingTop: '10px', overflow: 'auto', maxWidth: '600px', maxHeight: '400px' }}
                                                                        dangerouslySetInnerHTML={{ __html: cards[currentCardIndex].back }}
                                                                    />


                                                                ) : ''}
                                                                <Divider sx={{ width: '100%' }} />

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
                                                                    <Box sx={{ paddingTop: '50px' }}>
                                                                        <Button variant="contained" color="primary" size="small" sx={{ maxWidth: '200px' }} onClick={handleShowBack}>
                                                                            Mostrar resposta
                                                                        </Button>
                                                                    </Box>



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
            ) : <CircularProgress color="inherit" />
            }


        </StudyComponentDiv >






    );
};

export default SrsComponent;