import React from "react";
import useStyles from "./styles";
import { withStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { Checkbox, Avatar, Button, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";


class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ""
          };
    }

    render() {
        const { classes } = this.props;

    const buttonStyle = {
      backgroundColor: "#00C170"
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Link className={classes.link} to="/landing">
            <div className={classes.logoContainer}>
              
              <h1 className={classes.title}>NOTE 360</h1>
            </div>
          </Link>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={e => this.submitSignup(e)} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  style={{ color: "#ffffff" }}
                  autoFocus
                  variant="outlined"
                  required={true}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => this.userTyping("email", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required={true}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.userTyping("password", e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required={true}
                  fullWidth
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password-confirmation"
                  onChange={e => this.userTyping("passwordConfirmation", e)}
                />
              </Grid>
              {this.state.signupError ? (
                <Grid container justify="center">
                  <Grid item>
                    <Typography className={classes.errorText} variant="body2">
                      {this.state.signupError}
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              style={buttonStyle}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link
                  className={classes.link}
                  href="#"
                  variant="body2"
                  to="/signin"
                >
                  Already have an account?{" "}
                  <span className={classes.signIn}>Sign in</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    switch(type) {
        case "email":
            this.setState({email: e.target.value});
            break;
        case "password":
            this.setState({password: e.target.value});
            break;
        case "passwordConfirmation":
            this.setState({ passwordConfirmation: e.target.value});
            break;
        deafult:
            break;    
    }
  };

  submitSignup = e => {
    e.preventDefault();

    if(!this.formIsValid()) {
        this.setState({ signupError: "passwords do not match!" });
        return;
    }

    console.log("TODO: Registo de usuário");





  };

}

export default withStyles(useStyles)(SignUp);