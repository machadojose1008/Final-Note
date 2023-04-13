import { useState } from 'react';
import { useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import "./signin.css";
import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase-config';


const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [redirectToApp, setRedirectToApp] = useState(false);
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // TODO: Validação do tipo de de texto de email sendo válido.
        // TODO: Aviso quando capslock estiver ligado na senha ]

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            setFormFields(defaultFormFields);
            setRedirectToApp(true);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    if(redirectToApp){
        return navigate('/app')
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <header>Final Note</header>

            <div id="signin" className="form-container">
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
                        />

                    </div>

                    {/*
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Lembrar-me"
                    />
                    */}

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
            </div>
        </Container>


    );

};

export default SignInForm;