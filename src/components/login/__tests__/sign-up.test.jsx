import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUpForm  from '../sign-up';

describe('SignUpForm', () => {
    test('Renderiza os componentes do formulário', () => {
        render(
            <Router>
                <SignUpForm/>
            </Router>
        );

        expect(screen.getByText('Inscreva-se')).toBeInTheDocument();
        expect(screen.getByLabelText('Usuário *')).toBeInTheDocument();
        expect(screen.getByLabelText('Endereço de Email *')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha *')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirme sua Senha *')).toBeInTheDocument();
        expect(screen.getByTestId('criarConta-button')).toBeInTheDocument();
        
    });

});