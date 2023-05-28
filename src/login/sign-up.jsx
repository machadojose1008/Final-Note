import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../utils/firebase/firebase-config';
import { HeaderLogo, SignInComponent, SignInContainer } from './signStyles';
import { db } from '../utils/firebase/firebase-config'
import { collection, addDoc, query, where, getDocs  } from 'firebase/firestore';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

require("firebase/firestore");
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [redirectToSignIn, setRedirectToSignIn] = useState(false);
    const [emailFormatConfirmation, setEmailFormatConfirmation] = useState(true);
    const [passwordFormatConfirmation, setPasswordFormatConfirmation] = useState(true);
    const { displayName, email, password, confirmPassword } = formFields;
    const mensagemErroSenha = "Senha não pode ter espaços,deve ter no mínimo 8 caracteres, deve conter pelo menos 1 número, deve ter pelo menos 1 letra maiúscula e 1 letra minúscula. Você pode usar os seguintes símbolos: !, @, #, $, & "
    

    const navigate = useNavigate();

    const findUserIdByEmail = async (email) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
        let userId = null;
        querySnapshot.forEach((doc) => {
            userId = doc.id;
        });
        return userId;
    };


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const result = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            setFormFields(defaultFormFields);
            setRedirectToSignIn(true);
            if (result.user) {
                const { user } = result;
                await createUserDocumentFromAuth(user, { displayName });
                
                const userId = await findUserIdByEmail(user.email);

                const decksCollectionRef = collection(db, `users/${userId}/decks`);
                const decksDocRef = await addDoc(decksCollectionRef, {title: 'Primeiro Deck'});

                const notebooksCollectionRef = collection(db, `users/${userId}/notebooks`);
                const notebooksDocRef = await addDoc(notebooksCollectionRef, {title:'Primeiro Caderno'});

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

    if (redirectToSignIn) {
        return navigate('/signin', { state: { cadastrado: true } });
    }


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

        if (name === 'password') {
             setPasswordFormatConfirmation(false);
            if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9@$&!]{8,}/.test(value))
                setPasswordFormatConfirmation(true);
            
        }

        if (name === 'confirmPassword') {
            setPasswordsMatch(false);
            if (password === value) {
                setPasswordsMatch(true);
            }

        }

        if (name === 'email') {
            setEmailFormatConfirmation(false);
            if (/\S+@\S+\.\S+/.test(value)) {
                setEmailFormatConfirmation(true);
            }
        }

    };

    return (

        <SignInComponent>
            <HeaderLogo>Final Note</HeaderLogo>
            <SignInContainer>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
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
                                    error={!emailFormatConfirmation}
                                    style={{ color: "#ffffff" }}
                                    variant="outlined"
                                    required={true}
                                    fullWidth
                                    id="email"
                                    label="Endereço de Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    helperText={emailFormatConfirmation ? '' : "Email Inválido"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!passwordFormatConfirmation}
                                    variant="outlined"
                                    required={true}
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    helperText={passwordFormatConfirmation ? '' : mensagemErroSenha}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!passwordsMatch}
                                    variant="outlined"
                                    required={true}
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirme sua Senha"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    helperText={passwordsMatch ? '' : "senhas não coincidem"}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Inscreva-se
                            </Button>
                        </Grid>

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
                </Container>
            </SignInContainer>


        </SignInComponent>


    );

};

export default SignUpForm;