import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SrsComponent from "../srs";
import { Timestamp, serverTimestamp } from "firebase/firestore";


describe('SrsComponent', () => {

    test('Renderiza corretamente os cards', () => {
        //Array de decks mock para teste
        const decks = [{
            id: '1',
            title: 'Teste',
            cards: [{
                back: '<p>Traseira do teste</p>',
                front: '<p>Frente do teste</p>',
                ease: 1,
                reviewDate: Timestamp.fromDate(new Date()),
                id: '1',
                title: 'Título do card de teste'
            }],
        }];

        render(
            <SrsComponent decks={decks} />
        );

        // Renderiza o botão revisar tudo
        expect(screen.getByTestId('botao revisao')).toBeInTheDocument();
        // Renderiza o card 
        expect(screen.getByText('Teste')).toBeInTheDocument();
        // Renderiza o aviso de revisão
        expect(screen.getByText('Cartões em Vermelho precisam de revisão')).toBeInTheDocument();
        // Renderiza o card dentro do deck 
        expect(screen.getByText('Título do card de teste')).toBeInTheDocument();


    });

    test('Modal abrir ao clicar em revisar deck', async () => {

        //Array de decks mock para teste
        const decks = [{
            id: '1',
            title: 'Teste',
            cards: [{
                back: '<p>Traseira do teste</p>',
                front: '<p>Frente do teste</p>',
                ease: 1,
                reviewDate: Timestamp.fromDate(new Date()),
                id: '1',
                title: 'Título do card de teste'
            }],
        }];

        render(
            <SrsComponent decks={decks} />
        );

        const revisarDeck = screen.getByText('Revisar Baralho');
        fireEvent.click(revisarDeck);
        // Testa o modal abrir ao clicar no botão
        await waitFor(() => {
            expect(screen.getByTestId('modal')).toBeInTheDocument();
        });

        const mostrarResposta = screen.getByText('Mostrar resposta');
        fireEvent.click(mostrarResposta);

        // Testa aparecer a back do card quando clicar em mostrar resposta
        await waitFor(() => {
            expect(screen.getByTestId('back')).toBeInTheDocument();
        })

    });

    test('Modal abrir ao clicar em revisar tudo', async () => {


        //Array de decks mock para teste
        const decks = [{
            id: '1',
            title: 'Teste',
            cards: [{
                back: '<p>Traseira do teste</p>',
                front: '<p>Frente do teste</p>',
                ease: 1,
                reviewDate: Timestamp.fromDate(new Date()),
                id: '1',
                title: 'Título do card de teste'
            }],
        }];

        render(
            <SrsComponent decks={decks} />
        );

        const revisarTudo = screen.getByText('Revisar Tudo');
        fireEvent.click(revisarTudo);

        await waitFor(() => {
            expect(screen.getByTestId('modal')).toBeInTheDocument();
        });

        const mostrarResposta = screen.getByText('Mostrar resposta');
        fireEvent.click(mostrarResposta);

        // Testa aparecer a back do card quando clicar em mostrar resposta
        await waitFor(() => {
            expect(screen.getByTestId('back')).toBeInTheDocument();
        });


    });

    test('Dialog abrir quando clica em como funciona', async () => {
        //Array de decks mock para teste
        const decks = [{
            id: '1',
            title: 'Teste',
            cards: [{
                back: '<p>Traseira do teste</p>',
                front: '<p>Frente do teste</p>',
                ease: 1,
                reviewDate: Timestamp.fromDate(new Date()),
                id: '1',
                title: 'Título do card de teste'
            }],
        }];

        render(
            <SrsComponent decks={decks} />
        );

        const button = screen.getByText('Como Funciona');
        fireEvent.click(button);
        //Testa dialog abrir
        await waitFor(() => {
            expect(screen.getByTestId('dialog-test')).toBeInTheDocument()
        });


    });






});