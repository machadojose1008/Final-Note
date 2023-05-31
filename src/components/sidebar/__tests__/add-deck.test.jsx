import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddDeck from "../buttons/add-deck";


describe('AddDeck Component', () => {

    test('Renderizar o botão', () => {
        render(<AddDeck />);
        const buttonElement = screen.getByTestId('addDeck-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Novo Baralho');
    });

    test('Abrir o dialog quando clicado', () => {
        render(<AddDeck />);
        const buttonElement = screen.getByTestId('addDeck-button');
        fireEvent.click(buttonElement);
        const dialogTitleElement = screen.getByText('Insira um título para seu baralho');
        expect(dialogTitleElement).toBeInTheDocument();
    });

    test('Fechar o dialog quando clicar em fechar', async () => {
        render(<AddDeck />);
        const buttonElement = screen.getByTestId('addDeck-button');
        fireEvent.click(buttonElement);
        const cancelButtonElement = screen.getByText('Cancelar');
        fireEvent.click(cancelButtonElement);
        const dialogTitleElement = screen.queryByText('Insira um título para seu baralho');
        await waitFor(() => {
            expect(dialogTitleElement).not.toBeInTheDocument();
        });
    });

    test('Deve chamar a função newDeck quando clicar em pronto', async () => {
        const newDeckMock = jest.fn();
        render(<AddDeck newDeck={newDeckMock} />);
        const buttonElement = screen.getByTestId('addDeck-button');
        fireEvent.click(buttonElement);
        const titleInput = screen.getByLabelText('Título do baralho');
        fireEvent.change(titleInput, { target: { value: 'Lorem ipsum' } });
        const prontoButtonElement = screen.getByText('Pronto');
        fireEvent.click(prontoButtonElement);

        await waitFor(() => {
            expect(newDeckMock).toHaveBeenCalled();
        });



    });


});