import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignInForm from '../signin';
import userEvent from '@testing-library/user-event';
import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase-config';
import { auth } from '../../../utils/firebase/firebase-config';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';


describe('SignInForm', () => {


    test('Renderiza corretamente os formulários', () => {

        render(
            <Router>
                <SignInForm />
            </Router>
        );

        expect(screen.getByText('Entre já')).toBeInTheDocument();
        expect(screen.getByLabelText('Endereço de Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Senha')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
        expect(screen.getByText('Não possui uma conta? Crie agora')).toBeInTheDocument();

    });

    test('Clique Botão', async () => {
        const user = userEvent.setup();

        render(
            <Router>
                <SignInForm />
            </Router>
        );

        await user.click(screen.getByRole('button', { name: 'Entrar' }));

        expect(window.alert).toHaveBeenCalled();


    })


    /*    test('Erro quando email ou senha estiverem vazios', async () => {
           const [signInAuthUserWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
           
           // renderiza o componente
           render(
               <Router>
                   <SignInForm />
               </Router>
           );
   
           //Obter os campos 
           const emailField = screen.getByLabelText('Endereço de Email');
           const passwordField = screen.getByLabelText('Senha');
   
           // Obternha o botão e clique 
           //const button = screen.getByRole('button', { name: 'Entrar' });
           fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
   
           const response = await signInAuthUserWithEmailAndPassword(emailField, passwordField);
           console.log(response);
           //expect(window.alert).toHaveBeenCalledWith('Por favor, preencha os campos de email e senha');
       })
    */

});
