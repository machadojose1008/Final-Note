import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { HeaderLogo, SignInComponent, SignInContainer } from './signStyles';
import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase-config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase/firebase-config';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [loggedEmail, setLoggedEmail] = useState('');
    const [cadastroRecente, setCadastroRecente] = useState(false);
    const location = useLocation();
    const [signInAuthUserWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);


    useEffect(() => {
        setCadastroRecente(location.state);
        if (cadastroRecente) {
            alert('Email Cadastrado!');
        }


    }, []);



    // A tag useState seta um estado de um objeto de forma que se quisermos controlar a re-renderização 
    // do componente podemos usar a tar useEffect que vai executar um callback function toda vez que o valor do useState mudar
    const [redirectToApp, setRedirectToApp] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        // TODO: Validação do tipo de de texto de email sendo válido.
        // TODO: Aviso quando capslock estiver ligado na senha ]

        if (!email || !password) {
            alert('Por favor, preencha os campos de email e senha');
            return;
        }

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setFormFields(defaultFormFields);



            setRedirectToApp(true);
            setLoggedEmail(response.user.email);

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Senha incorreta!');
                    break;
                case 'auth/user-not-found':
                    alert('Nenhum usuário registrado nesse email!');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    if (user) {
        //Armazena localmente o usuário logado 
        localStorage.setItem('user', JSON.stringify(user));
        // Redireciona para a aplicação principal
        return navigate('/app');
        
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (

        <SignInComponent>
            <HeaderLogo>Final Note</HeaderLogo>
            <SignInContainer>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Typography component="h1" variant="h5">
                        Entre já
                    </Typography>
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div id='email' >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Endereço de Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                inputProps={{
                                    'aria-label': 'Endereço de Email'
                                }}
                            />
                        </div>

                        <div id="password">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                inputProps={{
                                    'aria-label': 'Senha'
                                }}
                            />

                        </div>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Entrar
                        </Button>

                        <Grid container>
                            <Grid item xs={10}>
                                <Link
                                    href="#"
                                    variant="body2"
                                    to="/signup">
                                    {"Não possui uma conta? Crie agora"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </SignInContainer>



        </SignInComponent>



    );

};

export default SignInForm;