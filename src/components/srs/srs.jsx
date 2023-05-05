import { Button, Card, CardActions, CardContent, Grid, List, ListItem, Typography } from "@mui/material";
import { StudyComponentDiv, StyledCardContent } from "../componentStyles";


const SrsComponent = (props) => {

    const { decks } = props;

    const handleClick = () => {
        console.log('click');
    };

    return (
        <StudyComponentDiv>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid key='deckName'>
                        <h1>Decks</h1>
                    </Grid>
                </Grid>
                {decks.map((deck) => {
                    if (deck.cards.length === 0) {
                        return (
                            <Grid item xs={2.4}>
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
                                <Card raised sx={{ maxWidth: '300px', padding: '5px', maxHeight: '320px', paddingBottom: '80px'}}>

                                    <Typography variant="h4" color='black' sx={{ position: 'absolute', backgroundColor:'white', minWidth:'200px' }} gutterBottom>
                                        {deck.title}
                                    </Typography>
                                    <StyledCardContent >
                                        {deck.cards.map((card) => (
                                            <ul>
                                                <li>
                                                    {card.title}
                                                </li>
                                            </ul>
                                        ))}
                                    </StyledCardContent>
                                    <CardActions sx={{ position: 'absolute' }}>
                                        <Button size='small' onClick={handleClick}>Revisar Deck</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                })}
            </Grid>


        </StudyComponentDiv>




    );
};

export default SrsComponent;