import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddDeck from "../buttons/add-deck";


describe('AddDeck Component', () => {
    
    test('Renderizar o botão', () => {
        render(<AddDeck />);
        const buttonElement = screen.getByTestId('addDeck-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Novo Deck');
    });


});