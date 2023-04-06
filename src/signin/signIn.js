import React from "react";
import { withStyles } from '@mui/styles';
import { Avatar, Checkbox, CssBaseline, Button, Grid, Container, FormControlLabel, Link, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
//import useStyles from "./styles";
import "./style.css"

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

        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <header>Final Note</header>

                <div id="signin" className="form-container">
                    <Avatar >
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                                label="Email Address"
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
                                label="Password"
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
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
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