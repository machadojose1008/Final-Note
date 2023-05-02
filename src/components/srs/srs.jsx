import { Button, Card, CardActions, CardContent, Grid, List, ListItem, Typography } from "@mui/material";
import { StudyComponentDiv } from "../componentStyles";


const SrsComponent = (props) => {

    const { decks } = props;



    return (
        <StudyComponentDiv>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid>
                        <h1>Decks</h1>
                    </Grid>
                </Grid>
                {decks.map((deck) => (
                    <Grid item xs={2.5}>
                        <Card raised sx={{ maxWidth: '200px', padding: '5px' }}>
                            <CardContent >
                                <Typography variant="h4" color='black' gutterBottom>
                                    {deck.title}
                                </Typography>

                                {deck.cards.map((card) => (
                                    <List>
                                        <ListItem>
                                            {card.title}
                                        </ListItem>

                                    </List>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button size='small'>Estudar Deck</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        </StudyComponentDiv>




    );
};

export default SrsComponent;