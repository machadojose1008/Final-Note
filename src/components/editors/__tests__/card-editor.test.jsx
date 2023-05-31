import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import CardEditorComponent from "../card-editor";

const selectedCard = {
    id: '1',
    front: '<p>Frente do card de teste</p>',
    back: '<p>Traseira do card de teste</p>',
    title: '',

};
const selectedDeckIndex = '1';

describe('CardEditorComponent', () => {

    test('Renderiza o Card', async () => {
        render(
            <CardEditorComponent
                selectedCard={selectedCard}
                selectedDeckIndex={selectedDeckIndex}
            />
        );

        // Testa a renderização do card
        expect(screen.getByText('Título do cartão:')).toBeInTheDocument();
        // Render do título do card
        expect(screen.getByPlaceholderText('Título do cartão')).toBeInTheDocument();

    });

    test('Atualiza o título corretamente', () => {


        const { getByPlaceholderText } =
            render(
                <CardEditorComponent
                    selectedCard={selectedCard}
                    selectedDeckIndex={selectedDeckIndex}
                />
            );
        const titleInput = getByPlaceholderText('Título do cartão');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        expect(titleInput.value).toBe('New Title');
    });

    test('Chama o closeCard corretamente', () => {
        const closeCardMock = jest.fn();
        const { getByTestId } = render(
            < CardEditorComponent
                selectedCard={selectedCard}
                selectedDeckIndex={selectedDeckIndex}
                closeCard={closeCardMock}
            />
        );
        const closeButton = getByTestId('close-button');


        fireEvent.click(closeButton);

        expect(closeCardMock).toHaveBeenCalled();


    });

});