import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase-config";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Senhas não coincidem');
            return;
        }

        // TODO: COnfirmação do esitlo sendo email e do tipo de senha aceita.

        try {
            const result = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            if (result.user) {
                const { user } = result;
                await createUserDocumentFromAuth(user, { displayName });
                resetFormFields();

            }



        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Não foi possível criar uma nova conta. Email já registrado!');
            } else {
                console.log('user creation encountered an error', error);
            }

        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <header>Final Note</header>

            <div id='signup' className='form-container'>

                <form
                    noValidate
                    //Função chamada quando o botão com o tipo submit é acionado
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                Inscreva-se
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{ color: "#ffffff" }}
                                autoFocus
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="displayName"
                                label="Usuário"
                                name="displayName"
                                autoComplete="displayName"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{ color: "#ffffff" }}
                                variant="outlined"
                                required={true}
                                fullWidth
                                id="email"
                                label="Endereço de Email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required={true}
                                fullWidth
                                name="confirmPassword"
                                label="Confirme sua Senha"
                                type="password"
                                id="confirmPassword"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox value="allowExtraEmails" color="primary" />
                                }
                                label="Quero receber emails de novidades."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Inscreva-se
                    </Button>
                    <Grid container>
                        <Grid item xs={10}>
                            <Link
                                href="#"
                                variant="body2"
                                to="/signin">
                                {"Já Possui uma conta? Entre Já"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

};

export default SignUpForm;