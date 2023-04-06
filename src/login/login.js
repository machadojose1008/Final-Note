import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    setErrorMessage('');
                    window.location.href = '/loggedin.html#' + res.user.email;
                })
                .catch((error) => {
                    setErrorMessage('Incorrect login info.');
                });
        }
    };

    const handleBackClick = () => {
        setStep(step - 1);
    };

    const handleNextClick = () => {
        if (step === 1 && !isValidEmail(email)) {
            setErrorMessage('Please enter a valid email.');
        } else if (step === 2 && password.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
        } else {
            setErrorMessage('');
            setStep(step + 1);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    return (
        <div className="form-container">
            <h1 className="header">Entre já</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="form-group" data-step="1">
                        <label htmlFor="email-input">Entre com seu Email</label>
                        <input
                            id="email-input"
                            className="form-control"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                )}
                {step === 2 && (
                    <div className="form-group final" data-step="2">
                        <label htmlFor="password-input">Entre com a sua Senha</label>
                        <input
                            id="password-input"
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                )}
                {errorMessage && <p id="error-message">{errorMessage}</p>}
                {step === 1 && (
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                )}
                {step === 2 && (
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                )}
                {step > 1 && (
                    <div id="back-button" onClick={handleBackClick}>
                        &#8592;
                    </div>
                )}
            </form>
            <div className="infor-section">
                <p>Ainda não tem uma conta?</p>
                <a href="signup.html">Inscreva-se!</a>
            </div>
        </div>
    );
};

export default Login;