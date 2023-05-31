import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCard from "../buttons/add-card";


describe('AddCard Component', () => {
    const decksTitle = ['deck 1', 'deck 2', 'deck 3'];

    test('Renderizar o botão', () => {
        render(<AddCard decksTitle={decksTitle} />);
        const buttonElement = screen.getByTestId('novoCard-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Novo Cartão');
    });

    test('Abrir o dialog quando clicado', () => {
        render(<AddCard decksTitle={decksTitle} />);
        const buttonElement = screen.getByTestId('novoCard-button');
        fireEvent.click(buttonElement);
        const dialogTitleElement = screen.getByText('Insira um título para o seu cartão');
        expect(dialogTitleElement).toBeInTheDocument();

    });

    test('Fechar o dialog quando clicar em fechar', async () => {
        render(<AddCard decksTitle={decksTitle} />);
        const buttonElement = screen.getByTestId('novoCard-button');
        fireEvent.click(buttonElement);
        const cancelButtonElement = screen.getByText('Cancelar');
        fireEvent.click(cancelButtonElement);
        const dialogTitleElement = screen.queryByText('Insira um título para o seu cartão');
        await waitFor(() => {
            expect(dialogTitleElement).not.toBeInTheDocument();
        });

    });

    test('Deve chamar a função newCard quando clicar em pronto', async () => {
        const newCardMock = jest.fn();
        render(<AddCard decksTitle={decksTitle} newCard={newCardMock} />);
        const buttonElement = screen.getByTestId('novoCard-button');
        fireEvent.click(buttonElement);
        const titleInput = screen.getByLabelText('Título do Cartão');
        fireEvent.change(titleInput, { target: { value: 'Lorem ipsum' } });
        const prontoButtonElement = screen.getByText('Pronto');
        fireEvent.click(prontoButtonElement);

        await waitFor(() => {
            expect(newCardMock).toHaveBeenCalled();
        });
    });
})