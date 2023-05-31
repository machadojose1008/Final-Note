import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import SignInForm from '../signin';

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: jest.fn(),
}));

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
/* 
    it('Deve chamar o navigate quando usuário logar', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { getByLabelText, getByRole } = render(
            <Router>
                <SignInForm />
            </Router>


        );



        // Obtem e preenche os campos formulários 
        const emailField = screen.getByLabelText('Endereço de Email');
        const passwordField = screen.getByLabelText('Senha');
        const button = screen.getByRole('button', { name: 'Entrar' });

        fireEvent.change(getByLabelText('Endereço de Email'), { taget: { value: 'admin@admin.com' } });
        fireEvent.change(getByLabelText('Senha'), { target: { value: '12341234' } });
        await fireEvent.click(getByRole('button', { name: 'Entrar' }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/app');
        });


    }); */

    /*     test('Clique Botão', async () => {
    
            render(
                <Router>
                    <SignInForm />
                </Router>
            );
    
            userEvent.click(screen.getByRole('button', {name: 'Entrar'}))
    
            expect(window.alert).toHaveBeenCalled();
    
    
        })
     */

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
