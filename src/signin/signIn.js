import React from "react";
import useStyles from "./styles";
import { withStyles } from '@mui/styles';
import { CheckBox, Avatar, Checkbox, CssBaseline, Button, Grid, Container, FormControlLabel, Link, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";


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
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={event => {
                            this.authWithEmailPassword(event);
                        }}
                        ref={form => {
                            this.loginForm = form;
                        }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={input => {
                                this.emailInput = input;
                            }}
                        />
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
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

export default withStyles(useStyles)(SignIn);