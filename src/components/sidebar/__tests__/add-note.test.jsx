import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNote from "../buttons/add-note";

describe('AddNote Component', () => {
    const notebooksTitle = ['notebook 1','notebook 2','notebook 3'];

    test('Renderizar o botão', () => {
        render(<AddNote notebooksTitle={notebooksTitle} /> );
        const buttonElement = screen.getByTestId('novaNota-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Nova Nota');
    });

    test('Abrir o dialog quando clicado', () => {
        render(<AddNote notebooksTitle={notebooksTitle} />);
        const buttonElement = screen.getByTestId('novaNota-button');
        fireEvent.click(buttonElement);
        const dialogTitleElement = screen.getByText('Insira um título para a nota');
        expect(dialogTitleElement).toBeInTheDocument();
    });

    test('Fechar o dialog quando clicar em fechar', async () => {
        render(<AddNote notebooksTitle={notebooksTitle} />);
        const buttonElement = screen.getByTestId('novaNota-button');
        fireEvent.click(buttonElement);
        const cancelButtonElement = screen.getByText('Cancelar');
        fireEvent.click(cancelButtonElement);
        const dialogTitleElement = screen.queryByText('Insira um título para a nota');
        await waitFor(() => {
            expect(dialogTitleElement).not.toBeInTheDocument();
        });

    });

    test('Deve chamar a função newNote quando clicar em pronto', async () => {
        const newNoteMock = jest.fn();
        render(<AddNote notebooksTitle={notebooksTitle} newNote={newNoteMock} />);
        const buttonElement = screen.getByTestId('novaNota-button');
        fireEvent.click(buttonElement);
        const titleInput = screen.getByLabelText('Título da Nota');
        fireEvent.change(titleInput, { target: { value: 'Lorem ipsum' } });
        const prontoButtonElement = screen.getByText('Pronto');
        fireEvent.click(prontoButtonElement);

        await waitFor(() => {
            expect(newNoteMock).toHaveBeenCalled();
        });
    });
});