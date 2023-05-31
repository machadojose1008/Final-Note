import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddNotebook from "../buttons/add-notebook";

describe('AddNotebook Component', () => {

    test('Renderizar Botão', () => {
        render(<AddNotebook />);
        const buttonElement = screen.getByTestId('addNotebook-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Novo Caderno');
    });

    test('Abrir o dialog quando clicado', () => {
        render(<AddNotebook />);
        const buttonElement = screen.getByTestId('addNotebook-button');
        fireEvent.click(buttonElement);
        const dialogTitleElement = screen.getByText('Insira um título para o seu caderno');
        expect(dialogTitleElement).toBeInTheDocument();
    });

    test('Fechar o dialog quando clicar em fechar', async () => {
        render(<AddNotebook />);
        const buttonElement = screen.getByTestId('addNotebook-button');
        fireEvent.click(buttonElement);
        const cancelButtonElement = screen.getByText('Cancelar');
        fireEvent.click(cancelButtonElement);
        const dialogTitleElement = screen.queryByText('Insira um título para o seu caderno');
        await waitFor(() => {
            expect(dialogTitleElement).not.toBeInTheDocument();
        });
    });

    test('Deve charmar a função newNotebook quando clicar em pronto', async () => {
        const newNotebookMock = jest.fn();
        render(<AddNotebook newNotebook={newNotebookMock} />);
        const buttonElement = screen.getByTestId('addNotebook-button');
        fireEvent.click(buttonElement);
        const titleInput = screen.getByLabelText('Título do caderno');
        fireEvent.change(titleInput, { target: { value: 'Lorem ipsun' } });
        const prontoButtonElement = screen.getByText('Pronto');
        fireEvent.click(prontoButtonElement);
        await waitFor(() => {
            expect(newNotebookMock).toHaveBeenCalled();
        });

    });

})
