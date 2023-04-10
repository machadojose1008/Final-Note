import React from "react";
import { Avatar, Checkbox, CssBaseline, Button, Grid, Container, FormControlLabel, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom"
//import useStyles from "./styles";
import "./signin.css"

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    }

    authWithEmailPassword(event) {
        event.preventDefault();
        console.log("Authed with email");
        console.table([
            { email: this.emailInput.value, password: this.passwordInput.value }
        ]);
    }

    render() {


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
                        onSubmit={event => {
                            this.authWithEmailPassword(event);
                        }}
                        ref={form => {
                            this.loginForm = form;
                        }}
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
                                autoFocus="true"
                                inputRef={input => {
                                    this.emailInput = input;
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
                                inputRef={input => {
                                    this.passwordInput = input;
                                }}
                            />

                        </div>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Lembrar-me"
                        />
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

    }

}

export default SignIn;